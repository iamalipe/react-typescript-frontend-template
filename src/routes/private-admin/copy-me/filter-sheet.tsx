import * as React from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const search = useSearch({ from: "/admin/copy-me" }) as any;
  const navigate = useNavigate();

  // Keep local filter values synced with query search params
  const [enumString, setEnumString] = React.useState<string>(search.enumString || "ALL");
  const [booleanSwitch, setBooleanSwitch] = React.useState<string>(search.booleanSwitch || "ALL");

  React.useEffect(() => {
    setEnumString(search.enumString || "ALL");
    setBooleanSwitch(search.booleanSwitch || "ALL");
  }, [search.enumString, search.booleanSwitch]);

  const handleApply = () => {
    navigate({
      to: ".",
      search: (prev: any) => ({
        ...prev,
        page: 1, // Reset page to 1 on filter apply
        enumString: enumString === "ALL" ? undefined : enumString,
        booleanSwitch: booleanSwitch === "ALL" ? undefined : booleanSwitch,
      }),
    });
    onOpenChange(false);
  };

  const handleClear = () => {
    setEnumString("ALL");
    setBooleanSwitch("ALL");
    navigate({
      to: ".",
      search: (prev: any) => ({
        ...prev,
        page: 1,
        enumString: undefined,
        booleanSwitch: undefined,
      }),
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Records</SheetTitle>
          <SheetDescription>
            Apply custom filters to narrow down the list of Copy-Me template records.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-6">
          {/* Enum Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Enum Status</Label>
            <Combobox value={enumString} onValueChange={(val) => setEnumString(val || "ALL")}>
              <ComboboxInput placeholder="Select Status Filter..." />
              <ComboboxContent className="w-full">
                <ComboboxList>
                  <ComboboxItem value="ALL">All Statuses</ComboboxItem>
                  <ComboboxItem value="Active">Active</ComboboxItem>
                  <ComboboxItem value="Inactive">Inactive</ComboboxItem>
                  <ComboboxItem value="Block">Block</ComboboxItem>
                  <ComboboxItem value="Pending">Pending</ComboboxItem>
                </ComboboxList>
                <ComboboxEmpty>No match found</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* Boolean Toggle Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Boolean Toggle Switch</Label>
            <Combobox value={booleanSwitch} onValueChange={(val) => setBooleanSwitch(val || "ALL")}>
              <ComboboxInput placeholder="Select Toggle Filter..." />
              <ComboboxContent className="w-full">
                <ComboboxList>
                  <ComboboxItem value="ALL">All Values</ComboboxItem>
                  <ComboboxItem value="true">Active (Yes)</ComboboxItem>
                  <ComboboxItem value="false">Inactive (No)</ComboboxItem>
                </ComboboxList>
                <ComboboxEmpty>No match found</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <SheetFooter className="gap-2 sm:gap-0 mt-6 border-t pt-4">
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            Clear Filters
          </Button>
          <Button onClick={handleApply} className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
