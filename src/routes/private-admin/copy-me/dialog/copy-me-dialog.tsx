import type { CopyMeType } from "@/api/copy-me-api";
import { faker } from "@faker-js/faker";
import FormController from "@/components/form/form-controller";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import apiQuery from "@/hooks/use-api-query";
import useQueryLoadingState from "@/hooks/use-query-loading-state";
import { handleFormError } from "@/lib/form";
import { cn } from "@/lib/utils";
import type { DialogStateType } from "@/routes/private-admin/private-admin-route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useForm, type Resolver, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState, useEffect } from "react";
import DialogSkeleton from "./dialog-skeleton";
import DialogViewMode from "./dialog-view-mode";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

// Form Schema
const formSchema = z.object({
  stringRequired: z.string().min(1, "Required Field"),
  stringTextarea: z.string().min(5, "Minimum 5 characters"),
  stringOptional: z.string().optional().default(""),
  stringTextareaOptional: z.string().optional().default(""),

  numberDecimal: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number({ message: "Decimal number is required" }).positive("Must be positive number")
  ),
  numberInt: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number({ message: "Integer number is required" }).int("Must be an integer")
  ),
  numberSlider: z.coerce.number().min(0).max(100),

  dateOnly: z.string().min(1, "Date is required"),
  dateTime: z.string().min(1, "Date and time is required"),
  dateRangeStart: z.string().min(1, "Start date is required"),
  dateRangeEnd: z.string().min(1, "End date is required"),
  dateTimeRangeStart: z.string().min(1, "Start date-time is required"),
  dateTimeRangeEnd: z.string().min(1, "End date-time is required"),

  booleanSwitch: z.boolean().default(false),
  enumString: z.enum(["Active", "Inactive", "Block", "Pending"]).default("Pending"),
  customOptionalString: z.string().min(1, "Required Selection"),

  // Client-side file values can be file objects or string URLs
  fileImage: z.any().optional(),
  fileDoc: z.any().optional(),

  // Arrays and sub-documents
  singleArray: z.array(z.string()).default([]),
  arrayObject: z.array(z.object({
    label: z.string().min(1, "Required label"),
    value: z.string().min(1, "Required value"),
  })).default([]),
  twoDArray: z.string().default("[]"), // Editable in UI via JSON textbox, validated in submit
  nestedObject: z.object({
    title: z.string().min(1, "Required nested title"),
    priority: z.coerce.number().int("Must be integer priority"),
  }).default({ title: "", priority: 1 }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export type CopyMeDialogProps = {
  state: DialogStateType;
  data?: CopyMeType;
};

const CopyMeDialog = ({ state }: CopyMeDialogProps) => {
  const recordQuery = state.id ? apiQuery.copyMe.useGet(state.id) : undefined;
  const { isLoading } = useQueryLoadingState(
    recordQuery ? [recordQuery] : []
  );

  if (isLoading) return <DialogSkeleton />;
  if (state.mode === "VIEW")
    return <DialogViewMode state={state} data={recordQuery?.data?.data} />;
  return <DialogMain state={state} data={recordQuery?.data?.data} />;
};

export default CopyMeDialog;

const DialogMain = ({ data, state }: CopyMeDialogProps) => {
  const navigate = useNavigate();
  const router = useRouter();

  // Custom State for Write-in Select
  const [selectMode, setSelectMode] = useState<"SELECT" | "CUSTOM">("SELECT");
  const [customVal, setCustomVal] = useState("");

  // Primitive Tag Input State
  const [tagInput, setTagInput] = useState("");

  const defaultValues: FormSchemaType = {
    stringRequired: data?.stringRequired ?? "",
    stringTextarea: data?.stringTextarea ?? "",
    stringOptional: data?.stringOptional ?? "",
    stringTextareaOptional: data?.stringTextareaOptional ?? "",
    numberDecimal: data?.numberDecimal ?? "" as unknown as number,
    numberInt: data?.numberInt ?? "" as unknown as number,
    numberSlider: data?.numberSlider ?? 50,
    // Format dates to YYYY-MM-DD or YYYY-MM-DDTHH:mm for HTML inputs
    dateOnly: data?.dateOnly ? data.dateOnly.split("T")[0] : "",
    dateTime: data?.dateTime ? data.dateTime.substring(0, 16) : "",
    dateRangeStart: data?.dateRangeStart ? data.dateRangeStart.split("T")[0] : "",
    dateRangeEnd: data?.dateRangeEnd ? data.dateRangeEnd.split("T")[0] : "",
    dateTimeRangeStart: data?.dateTimeRangeStart ? data.dateTimeRangeStart.substring(0, 16) : "",
    dateTimeRangeEnd: data?.dateTimeRangeEnd ? data.dateTimeRangeEnd.substring(0, 16) : "",
    booleanSwitch: data?.booleanSwitch ?? false,
    enumString: data?.enumString ?? "Pending",
    customOptionalString: data?.customOptionalString ?? "P1",
    fileImage: data?.fileImage ?? null,
    fileDoc: data?.fileDoc ?? null,
    singleArray: data?.singleArray ?? [],
    arrayObject: data?.arrayObject ?? [],
    twoDArray: data?.twoDArray ? JSON.stringify(data.twoDArray) : "[]",
    nestedObject: {
      title: data?.nestedObject?.title ?? "",
      priority: data?.nestedObject?.priority ?? 1,
    },
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FormSchemaType>,
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const { fields: arrayFields, append: appendArrayField, remove: removeArrayField } = useFieldArray({
    control: form.control,
    name: "arrayObject",
  });

  // Handle write-in selections matching P1-P4
  useEffect(() => {
    if (data?.customOptionalString) {
      if (["P1", "P2", "P3", "P4"].includes(data.customOptionalString)) {
        setSelectMode("SELECT");
      } else {
        setSelectMode("CUSTOM");
        setCustomVal(data.customOptionalString);
      }
    }
  }, [data]);

  const onGenerateMock = () => {
    const mockData = {
      stringRequired: faker.commerce.productName(),
      stringTextarea: faker.commerce.productDescription(),
      stringOptional: faker.helpers.arrayElement(["", faker.company.buzzPhrase()]),
      stringTextareaOptional: faker.helpers.arrayElement(["", faker.lorem.paragraph()]),
      numberDecimal: parseFloat(faker.finance.amount({ min: 1, max: 1000, dec: 2 })),
      numberInt: faker.number.int({ min: 1, max: 100 }),
      numberSlider: faker.number.int({ min: 0, max: 100 }),
      dateOnly: format(faker.date.recent({ days: 10 }), "yyyy-MM-dd"),
      dateTime: faker.date.recent({ days: 10 }).toISOString(),
      dateRangeStart: format(faker.date.recent({ days: 5 }), "yyyy-MM-dd"),
      dateRangeEnd: format(faker.date.soon({ days: 5 }), "yyyy-MM-dd"),
      dateTimeRangeStart: faker.date.recent({ days: 5 }).toISOString(),
      dateTimeRangeEnd: faker.date.soon({ days: 5 }).toISOString(),
      booleanSwitch: faker.datatype.boolean(),
      enumString: faker.helpers.arrayElement(["Active", "Inactive", "Block", "Pending"]) as any,
      customOptionalString: faker.helpers.arrayElement(["P1", "P2", "P3", "P4", "FakerCustom"]),
      singleArray: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
      arrayObject: [
        { label: "Color", value: faker.color.human() },
        { label: "Material", value: faker.commerce.productMaterial() }
      ],
      twoDArray: "[[1,2],[3,4]]",
      nestedObject: {
        title: faker.word.noun(),
        priority: faker.number.int({ min: 1, max: 5 }),
      }
    };

    Object.entries(mockData).forEach(([key, val]) => {
      form.setValue(key as any, val, { shouldValidate: true, shouldDirty: true });
    });

    if (["P1", "P2", "P3", "P4"].includes(mockData.customOptionalString)) {
      setSelectMode("SELECT");
    } else {
      setSelectMode("CUSTOM");
      setCustomVal(mockData.customOptionalString);
    }
  };

  const onClose = () => {
    form.reset();
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        ds: undefined,
      }),
    });
  };

  const formatPayload = (values: FormSchemaType) => {
    // Validating 2D array coordinates before sending
    let parsed2D: number[][] = [];
    try {
      parsed2D = JSON.parse(values.twoDArray);
      if (!Array.isArray(parsed2D) || parsed2D.some(row => !Array.isArray(row))) {
        throw new Error("Must be a 2D array format");
      }
    } catch {
      form.setError("twoDArray", { message: "Invalid 2D array matrix format (e.g. [[1,2],[3,4]])" });
      throw new Error("Validation failed");
    }

    return {
      ...values,
      twoDArray: parsed2D,
    };
  };

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const payload = formatPayload(values);
      const res = await apiQuery.copyMe.create(payload);
      if (!res.success) throw new Error("Database insertion failed");
      toast.success("Record created successfully.");
      router.invalidate();
      onClose();
    } catch (err: any) {
      if (err.message !== "Validation failed") {
        handleFormError({ form, error: err });
      }
    }
  };

  const onUpdate = async (values: FormSchemaType) => {
    try {
      if (!state.id) throw new Error("Missing record identifier");
      const payload = formatPayload(values);
      const res = await apiQuery.copyMe.update({
        id: state.id,
        data: payload,
      });
      if (!res.success) throw new Error("Database update failed");
      toast.success("Record updated successfully.");
      router.invalidate();
      onClose();
    } catch (err: any) {
      if (err.message !== "Validation failed") {
        handleFormError({ form, error: err });
      }
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[750px] sm:max-h-[90vh] overflow-y-auto px-4 md:px-6">
        <DialogHeader>
          <DialogTitle>{state.mode === "CREATE" ? "Create Copy-Me Record" : "Edit Copy-Me Record"}</DialogTitle>
          <DialogDescription>
            This reference template covers standard inputs, date-time ranges, sliders, lists, coordinates matrices, nested configurations, and document file attachments.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* stringRequired */}
            <FormController
              form={form}
              name="stringRequired"
              label="Required Text Input"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Enter required string"
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* stringOptional */}
            <FormController
              form={form}
              name="stringOptional"
              label="Optional Text Input"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Enter optional string"
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* numberDecimal */}
            <FormController
              form={form}
              name="numberDecimal"
              label="Decimal Number Input"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* numberInt */}
            <FormController
              form={form}
              name="numberInt"
              label="Integer Input"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="number"
                  step="1"
                  placeholder="0"
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* numberSlider */}
            <FormController
              form={form}
              name="numberSlider"
              label={`Slider Control (${form.watch("numberSlider")})`}
              render={({ field, isError, ariaDescribedby }) => (
                <div className="flex items-center gap-4 py-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="flex-1 accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    value={field.value as number}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={isError}
                    aria-describedby={ariaDescribedby}
                  />
                  <span className="font-bold font-mono text-sm w-8 text-right">{field.value}</span>
                </div>
              )}
            />

            {/* booleanSwitch */}
            <FormController
              form={form}
              name="booleanSwitch"
              label="Boolean Toggle Switch"
              render={({ field }) => (
                <div className="flex items-center gap-2 py-2">
                  <Switch
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm font-medium">
                    {field.value ? "Active (Yes)" : "Inactive (No)"}
                  </span>
                </div>
              )}
            />

            {/* enumString */}
            <FormController
              form={form}
              name="enumString"
              label="Enum Dropdown Status"
              render={({ field }) => (
                <Combobox
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput placeholder="Select status..." showClear={true} />
                  <ComboboxContent className="w-full">
                    <ComboboxList>
                      <ComboboxItem value="Active">Active</ComboboxItem>
                      <ComboboxItem value="Inactive">Inactive</ComboboxItem>
                      <ComboboxItem value="Block">Block</ComboboxItem>
                      <ComboboxItem value="Pending">Pending</ComboboxItem>
                    </ComboboxList>
                    <ComboboxEmpty>No results found</ComboboxEmpty>
                  </ComboboxContent>
                </Combobox>
              )}
            />

            {/* customOptionalString */}
            <FormController
              form={form}
              name="customOptionalString"
              label="Select Selector (with Write-In)"
              render={({ field }) => (
                <div className="space-y-2">
                  {selectMode === "SELECT" ? (
                    <Combobox
                      value={field.value as string}
                      onValueChange={(val) => {
                        if (val === "OTHER") {
                          setSelectMode("CUSTOM");
                          field.onChange("");
                        } else {
                          field.onChange(val);
                        }
                      }}
                    >
                      <ComboboxInput placeholder="Select option..." showClear={true} />
                      <ComboboxContent className="w-full">
                        <ComboboxList>
                          <ComboboxItem value="P1">P1</ComboboxItem>
                          <ComboboxItem value="P2">P2</ComboboxItem>
                          <ComboboxItem value="P3">P3</ComboboxItem>
                          <ComboboxItem value="P4">P4</ComboboxItem>
                          <ComboboxItem value="OTHER">Other Custom Write-In</ComboboxItem>
                        </ComboboxList>
                        <ComboboxEmpty>No results found</ComboboxEmpty>
                      </ComboboxContent>
                    </Combobox>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type custom text entry..."
                        value={customVal}
                        onChange={(e) => {
                          setCustomVal(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectMode("SELECT");
                          field.onChange("P1");
                        }}
                      >
                        Reset Select
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* dateOnly */}
            <FormController
              form={form}
              name="dateOnly"
              label="Calendar Date Only Picker"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-9",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            {/* dateTime */}
            <FormController
              form={form}
              name="dateTime"
              label="Date & Time Picker"
              render={({ field }) => {
                const dateVal = field.value ? new Date(field.value) : undefined;
                const timeVal = field.value ? format(new Date(field.value), "HH:mm") : "00:00";
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-9",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPp")
                        ) : (
                          <span>Pick a date & time</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 flex flex-col gap-2" align="start">
                      <Calendar
                        mode="single"
                        selected={dateVal}
                        onSelect={(date) => {
                          if (date) {
                            const [hours, minutes] = timeVal.split(":");
                            date.setHours(Number(hours), Number(minutes), 0, 0);
                            field.onChange(date.toISOString());
                          }
                        }}
                      />
                      <div className="flex items-center gap-2 border-t pt-2 mt-1">
                        <span className="text-xs font-semibold text-muted-foreground">Time:</span>
                        <Input
                          type="time"
                          value={timeVal}
                          className="h-8 w-28 text-xs"
                          onChange={(e) => {
                            const newTime = e.target.value || "00:00";
                            const baseDate = dateVal || new Date();
                            const [hours, minutes] = newTime.split(":");
                            baseDate.setHours(Number(hours), Number(minutes), 0, 0);
                            field.onChange(baseDate.toISOString());
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />

            {/* dateRange */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-sm font-medium">Date Range (Start & End)</Label>
              <FormController
                form={form}
                name="dateRangeStart"
                label=""
                render={({ field: _ }) => {
                  const startStr = form.watch("dateRangeStart");
                  const endStr = form.watch("dateRangeEnd");
                  const startVal = startStr ? new Date(startStr) : undefined;
                  const endVal = endStr ? new Date(endStr) : undefined;
                  
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-9",
                            (!startVal || !endVal) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startVal && endVal ? (
                            `${format(startVal, "LLL dd, yyyy")} - ${format(endVal, "LLL dd, yyyy")}`
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={startVal}
                          selected={{
                            from: startVal,
                            to: endVal,
                          }}
                          onSelect={(range) => {
                            form.setValue("dateRangeStart", range?.from ? format(range.from, "yyyy-MM-dd") : "");
                            form.setValue("dateRangeEnd", range?.to ? format(range.to, "yyyy-MM-dd") : "");
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>

            {/* dateTimeRange */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-sm font-medium">Date-Time Range (Start & End)</Label>
              <FormController
                form={form}
                name="dateTimeRangeStart"
                label=""
                render={({ field: _ }) => {
                  const startStr = form.watch("dateTimeRangeStart");
                  const endStr = form.watch("dateTimeRangeEnd");
                  const startVal = startStr ? new Date(startStr) : undefined;
                  const endVal = endStr ? new Date(endStr) : undefined;

                  const startTimeVal = startStr ? format(new Date(startStr), "HH:mm") : "00:00";
                  const endTimeVal = endStr ? format(new Date(endStr), "HH:mm") : "00:00";

                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-9",
                            (!startVal || !endVal) && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startVal && endVal ? (
                            `${format(startVal, "LLL dd, yyyy HH:mm")} - ${format(endVal, "LLL dd, yyyy HH:mm")}`
                          ) : (
                            <span>Pick a date-time range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 flex flex-col gap-3" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={startVal}
                          selected={{
                            from: startVal,
                            to: endVal,
                          }}
                          onSelect={(range) => {
                            if (range?.from) {
                              const [h, m] = startTimeVal.split(":");
                              range.from.setHours(Number(h), Number(m), 0, 0);
                              form.setValue("dateTimeRangeStart", range.from.toISOString());
                            } else {
                              form.setValue("dateTimeRangeStart", "");
                            }

                            if (range?.to) {
                              const [h, m] = endTimeVal.split(":");
                              range.to.setHours(Number(h), Number(m), 0, 0);
                              form.setValue("dateTimeRangeEnd", range.to.toISOString());
                            } else {
                              form.setValue("dateTimeRangeEnd", "");
                            }
                          }}
                          numberOfMonths={2}
                        />
                        <div className="flex items-center gap-4 justify-between border-t pt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">Start:</span>
                            <Input
                              type="time"
                              value={startTimeVal}
                              className="h-8 w-24 text-xs"
                              onChange={(e) => {
                                const newTime = e.target.value || "00:00";
                                const baseDate = startVal || new Date();
                                const [h, m] = newTime.split(":");
                                baseDate.setHours(Number(h), Number(m), 0, 0);
                                form.setValue("dateTimeRangeStart", baseDate.toISOString());
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">End:</span>
                            <Input
                              type="time"
                              value={endTimeVal}
                              className="h-8 w-24 text-xs"
                              onChange={(e) => {
                                const newTime = e.target.value || "00:00";
                                const baseDate = endVal || new Date();
                                const [h, m] = newTime.split(":");
                                baseDate.setHours(Number(h), Number(m), 0, 0);
                                form.setValue("dateTimeRangeEnd", baseDate.toISOString());
                              }}
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* fileImage */}
            <FormController
              form={form}
              name="fileImage"
              label="Image File Attachment (S3)"
              render={({ field }) => (
                <div className="space-y-2 text-left">
                  {typeof field.value === "string" && field.value && (
                    <div className="text-xs bg-muted p-2 rounded border truncate flex justify-between items-center">
                      <span className="truncate max-w-[200px]">{field.value}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => field.onChange(null)}
                      >
                        Change
                      </Button>
                    </div>
                  )}
                  {(!field.value || typeof field.value !== "string") && (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                    />
                  )}
                </div>
              )}
            />

            {/* fileDoc */}
            <FormController
              form={form}
              name="fileDoc"
              label="PDF File Attachment (S3)"
              render={({ field }) => (
                <div className="space-y-2 text-left">
                  {typeof field.value === "string" && field.value && (
                    <div className="text-xs bg-muted p-2 rounded border truncate flex justify-between items-center">
                      <span className="truncate max-w-[200px]">{field.value}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => field.onChange(null)}
                      >
                        Change
                      </Button>
                    </div>
                  )}
                  {(!field.value || typeof field.value !== "string") && (
                    <Input
                      type="file"
                      accept="application/pdf,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                      }}
                    />
                  )}
                </div>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            {/* stringTextarea */}
            <FormController
              form={form}
              name="stringTextarea"
              label="Required Text Area"
              maxLength={2000}
              render={({ field, isError, ariaDescribedby }) => (
                <Textarea
                  id={field.name}
                  placeholder="Provide multi-line description text (minimum 5 characters)"
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* stringTextareaOptional */}
            <FormController
              form={form}
              name="stringTextareaOptional"
              label="Optional Text Area"
              maxLength={2000}
              render={({ field, isError, ariaDescribedby }) => (
                <Textarea
                  id={field.name}
                  placeholder="Enter optional description comments..."
                  className={cn([isError ? "border-destructive" : ""])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />
          </div>

          <Separator />

          {/* COMPLEX DATA STRUCTURE EXAMPLES */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Complex Structured Form Inputs</h3>

            {/* 1. singleArray (primitive array of tags) */}
            <FormController
              form={form}
              name="singleArray"
              label="Primitive String Array Tags"
              render={({ field }) => (
                <div className="space-y-2 text-left">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag label..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (tagInput.trim()) {
                          field.onChange([...(field.value || []), tagInput.trim()]);
                          setTagInput("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {field.value?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          className="hover:text-destructive"
                          onClick={() => {
                            field.onChange(field.value.filter((_: any, i: any) => i !== index));
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            />

            {/* 2. arrayObject (Array of objects with label & value) */}
            <div>
              <Label className="block mb-2 font-medium">Array of Label-Value Objects (Dynamic Rows)</Label>
              <div className="space-y-2 border p-3 rounded-md bg-muted/10">
                {arrayFields.map((fieldItem, index) => (
                  <div key={fieldItem.id} className="flex gap-3 items-center">
                    <div className="flex-1">
                      <Input
                        placeholder="Label"
                        {...form.register(`arrayObject.${index}.label`)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Value"
                        {...form.register(`arrayObject.${index}.value`)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeArrayField(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendArrayField({ label: "", value: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Key-Value Entry
                </Button>
              </div>
            </div>

            {/* 3. twoDArray (2D Matrix coordinates) */}
            <FormController
              form={form}
              name="twoDArray"
              label="2D Array Matrix (JSON format, e.g. [[1,2],[3,4]])"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="text"
                  className={cn([isError ? "border-destructive font-mono" : "font-mono"])}
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />

            {/* 4. nestedObject (title & priority) */}
            <div className="border p-4 rounded-md space-y-4 bg-muted/20 text-left">
              <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Nested Configuration Object</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormController
                  form={form}
                  name="nestedObject.title"
                  label="Nested Object Title"
                  render={({ field }) => (
                    <Input
                      placeholder="Nested title"
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                <FormController
                  form={form}
                  name="nestedObject.priority"
                  label="Nested Object Priority"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Priority"
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="border-t pt-4 flex flex-row justify-between items-center w-full gap-2">
          <div>
            {state.mode === "CREATE" && (
              <Button type="button" variant="secondary" onClick={onGenerateMock}>
                Generate Mock
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {state.mode === "CREATE" ? (
              <Button onClick={form.handleSubmit(onSubmit)} type="submit">
                Create
              </Button>
            ) : (
              <Button onClick={form.handleSubmit(onUpdate)} type="submit">
                Update
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
