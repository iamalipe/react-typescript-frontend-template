import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/_private/artist");
const DialogForm = () => {
  const routeData = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const onClose = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        mode: undefined,
      }),
    });
  };

  return (
    <Dialog
      open={routeData.mode !== undefined}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="form01">
          <div className="flex items-center justify-center">
            <TabsList>
              <TabsTrigger value="form01">Form 01</TabsTrigger>
              <TabsTrigger value="form02">Form 02</TabsTrigger>
              <TabsTrigger value="form03">Form 03</TabsTrigger>
              <TabsTrigger value="form04">Form 04</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="form01" asChild>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-auto">
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
            </div>
          </TabsContent>
          <TabsContent value="form02" asChild>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-auto">
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
            </div>
          </TabsContent>
          <TabsContent value="form03" asChild>
            <div className="grid gap-4 py-4">
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
            </div>
          </TabsContent>
          <TabsContent value="form04" asChild>
            <div className="grid gap-4 py-4 max-h-[500px] overflow-auto">
              <FormItem />
              <FormItem />
              <FormItem />
              <FormItem />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            Close
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;

const FormItem = () => {
  return (
    <div className="flex flex-col px-2">
      <Label htmlFor="username" className="text-left mb-2">
        Username
      </Label>
      <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      <p className="text-xs text-destructive col-span-3 mt-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim
        laboriosam commodi ipsa ullam soluta eaque fuga. Impedit, minima iure?
        Fuga, omnis fugit. Possimus quidem sed veniam odit ex. Accusantium.
      </p>
    </div>
  );
};
