import { MultiSelect } from "@/components/select-dropdown/multi-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DRAINAGE_TYPE } from "@/static/drainage-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideFilter } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// ---------- Schema ----------
// numbers are strings by default, validated only when filter is enabled
const baseSchema = z.object({
  minAmount: z.string(),
  maxAmount: z.string(),
  minTemperature: z.string(),
  maxTemperature: z.string(),
  minPainLevel: z.string(),
  maxPainLevel: z.string(),
  minRecordedAt: z.string(),
  maxRecordedAt: z.string(),
  odor: z.array(z.string()),
  fluidType: z.array(z.string()),
  color: z.array(z.string()),
  drainageType: z.array(z.string()),
  consistency: z.array(z.string()),
});

// ---------- Types ----------
type BaseSchemaType = z.infer<typeof baseSchema>;

const PopoverFilter = () => {
  const [filterState, setFilterState] = useState({
    amount: false,
    temperature: false,
    recordedAt: false,
    painLevel: false,
    odor: false,
    fluidType: false,
    color: false,
    consistency: false,
    drainageType: false,
  });
  const [openPopover, setOpenPopover] = useState(false);

  const defaultValues: BaseSchemaType = {
    minAmount: "",
    maxAmount: "",
    minTemperature: "",
    maxTemperature: "",
    minPainLevel: "",
    maxPainLevel: "",
    minRecordedAt: "",
    maxRecordedAt: "",
    odor: [],
    fluidType: [],
    color: [],
    drainageType: [],
    consistency: [],
  };

  // --------- Conditional schema ---------
  const formSchema = useMemo(
    () =>
      baseSchema.superRefine((data, ctx) => {
        if (filterState.amount) {
          const min = parseFloat(data.minAmount);
          const max = parseFloat(data.maxAmount);

          if (isNaN(min)) {
            ctx.addIssue({
              code: "custom",
              path: ["minAmount"],
              message: "Please enter a valid min amount",
            });
          }
          if (isNaN(max)) {
            ctx.addIssue({
              code: "custom",
              path: ["maxAmount"],
              message: "Please enter a valid max amount",
            });
          }
          if (!isNaN(min) && !isNaN(max) && min > max) {
            ctx.addIssue({
              code: "custom",
              path: ["maxAmount"],
              message: "Max amount must be ≥ Min amount",
            });
          }
        }
        if (filterState.temperature) {
          const min = parseFloat(data.minTemperature);
          const max = parseFloat(data.maxTemperature);

          if (isNaN(min)) {
            ctx.addIssue({
              code: "custom",
              path: ["minTemperature"],
              message: "Please enter a valid min temperature",
            });
          }
          if (isNaN(max)) {
            ctx.addIssue({
              code: "custom",
              path: ["maxTemperature"],
              message: "Please enter a valid max max temperature",
            });
          }
          if (!isNaN(min) && !isNaN(max) && min > max) {
            ctx.addIssue({
              code: "custom",
              path: ["maxTemperature"],
              message: "Max temperature must be ≥ Min temperature",
            });
          }
        }
        if (filterState.painLevel) {
          const min = parseInt(data.minPainLevel);
          const max = parseInt(data.maxPainLevel);

          if (isNaN(min) || min < 0 || min > 10) {
            ctx.addIssue({
              code: "custom",
              path: ["minPainLevel"],
              message: "Min pain level must be between 0-10",
            });
          }
          if (isNaN(max) || max < 0 || max > 10) {
            ctx.addIssue({
              code: "custom",
              path: ["maxPainLevel"],
              message: "Max pain level must be between 0-10",
            });
          }
          if (!isNaN(min) && !isNaN(max) && min > max) {
            ctx.addIssue({
              code: "custom",
              path: ["maxPainLevel"],
              message: "Max pain level must be ≥ Min pain level",
            });
          }
        }
        if (filterState.recordedAt) {
          if (!data.minRecordedAt) {
            ctx.addIssue({
              code: "custom",
              path: ["minRecordedAt"],
              message: "Min date is required",
            });
          }
          if (!data.maxRecordedAt) {
            ctx.addIssue({
              code: "custom",
              path: ["maxRecordedAt"],
              message: "Max date is required",
            });
          }
        }
        if (filterState.odor && data.odor.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["odor"],
            message: "Please select odor",
          });
        }
        if (filterState.fluidType && data.fluidType.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["fluidType"],
            message: "Please select fluid type",
          });
        }
        if (filterState.color && data.color.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["color"],
            message: "Please select color",
          });
        }
        if (filterState.drainageType && data.drainageType.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["drainageType"],
            message: "Please select drainage type",
          });
        }
        if (filterState.consistency && data.consistency.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["consistency"],
            message: "Please select consistency",
          });
        }
      }),
    [filterState]
  );

  const form = useForm<BaseSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const onApplyFilter = (data: BaseSchemaType) => {
    console.log("onApplyFilter", data);
  };

  const onResetFilter = () => {
    form.reset();
    setFilterState({
      amount: false,
      temperature: false,
      recordedAt: false,
      painLevel: false,
      odor: false,
      fluidType: false,
      color: false,
      consistency: false,
      drainageType: false,
    });
  };

  const isAnyFilterActive = Object.values(filterState).some(
    (value) => value === true
  );

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="flex-none">
          <LucideFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4 min-w-80 max-h-[70vh]"
      >
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Filter</h1>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={onResetFilter}
                size="sm"
                variant="secondary"
              >
                Reset
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="default"
                onClick={form.handleSubmit(onApplyFilter)}
                disabled={!isAnyFilterActive}
              >
                Apply
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-auto p-1">
            {/* amount */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="amount"
                  checked={filterState.amount}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      amount: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("minAmount");
                      form.resetField("maxAmount");
                    }
                  }}
                />
                <Label htmlFor="amount">Fluid Amount (ml)</Label>
              </div>
              {filterState.amount && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="minAmount"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value}
                          placeholder="min"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="maxAmount"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value}
                          placeholder="max"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.minAmount && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.minAmount.message}
                      </p>
                    )}
                    {form.formState.errors.maxAmount && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.maxAmount.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="temperature"
                  checked={filterState.temperature}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      temperature: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("minTemperature");
                      form.resetField("maxTemperature");
                    }
                  }}
                />
                <Label htmlFor="temperature">Temperature (°F)</Label>
              </div>
              {filterState.temperature && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="minTemperature"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value}
                          placeholder="min"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="maxTemperature"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="0.01"
                          value={field.value}
                          placeholder="max"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.minTemperature && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.minTemperature.message}
                      </p>
                    )}
                    {form.formState.errors.maxTemperature && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.maxTemperature.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* painLevel */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="painLevel"
                  checked={filterState.painLevel}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      painLevel: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("minPainLevel");
                      form.resetField("maxPainLevel");
                    }
                  }}
                />
                <Label htmlFor="painLevel">Pain Level</Label>
              </div>
              {filterState.painLevel && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="minPainLevel"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="1"
                          value={field.value}
                          placeholder="min"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="maxPainLevel"
                      render={({ field }) => (
                        <Input
                          type="number"
                          step="1"
                          value={field.value}
                          placeholder="max"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.minPainLevel && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.minPainLevel.message}
                      </p>
                    )}
                    {form.formState.errors.maxPainLevel && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.maxPainLevel.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* color */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="color"
                  checked={filterState.color}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      color: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("color");
                    }
                  }}
                />
                <Label htmlFor="color">Color</Label>
              </div>
              {filterState.color && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <MultiSelect
                          variant="default"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          maxCount={1}
                          placeholder="select"
                          options={[
                            { value: "Clear", label: "Clear" },
                            { value: "Yellow", label: "Yellow" },
                            {
                              value: "Pink/Light Red",
                              label: "Pink/Light Red",
                            },
                            { value: "Red/Bloody", label: "Red/Bloody" },
                            { value: "Green", label: "Green" },
                            { value: "Brown", label: "Brown" },
                            { value: "Cloudy", label: "Cloudy" },
                          ]}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.color && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.color.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* odor */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="odor"
                  checked={filterState.odor}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      odor: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("odor");
                    }
                  }}
                />
                <Label htmlFor="odor">Odor</Label>
              </div>
              {filterState.odor && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="odor"
                      render={({ field }) => (
                        <MultiSelect
                          variant="default"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          maxCount={1}
                          placeholder="select"
                          options={[
                            { value: "None/Odorless", label: "None/Odorless" },
                            { value: "Mild", label: "Mild" },
                            { value: "Strong", label: "Strong" },
                            {
                              value: "Foul/Offensive",
                              label: "Foul/Offensive",
                            },
                            { value: "Sweet", label: "Sweet" },
                          ]}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.odor && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.odor.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* fluidType */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="fluidType"
                  checked={filterState.fluidType}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      fluidType: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("fluidType");
                    }
                  }}
                />
                <Label htmlFor="fluidType">Fluid Type</Label>
              </div>
              {filterState.fluidType && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="fluidType"
                      render={({ field }) => (
                        <MultiSelect
                          variant="default"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          maxCount={1}
                          placeholder="select"
                          options={[
                            { value: "Blood", label: "Blood" },
                            { value: "Pus", label: "Pus" },
                            {
                              value: "Lymph",
                              label: "Lymph",
                            },
                            { value: "Serous", label: "Serous" },
                            {
                              value: "Serosanguinous",
                              label: "Serosanguinous",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.fluidType && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.fluidType.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* drainageType */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="drainageType"
                  checked={filterState.drainageType}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      drainageType: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("drainageType");
                    }
                  }}
                />
                <Label htmlFor="drainageType">Drainage Type</Label>
              </div>
              {filterState.drainageType && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="drainageType"
                      render={({ field }) => (
                        <MultiSelect
                          variant="default"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          maxCount={1}
                          placeholder="select"
                          options={DRAINAGE_TYPE}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.drainageType && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.drainageType.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* consistency */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="consistency"
                  checked={filterState.consistency}
                  onCheckedChange={(checked) => {
                    setFilterState((prev) => ({
                      ...prev,
                      consistency: checked as boolean,
                    }));
                    if (!checked) {
                      form.resetField("consistency");
                    }
                  }}
                />
                <Label htmlFor="consistency">Consistency</Label>
              </div>
              {filterState.consistency && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Controller
                      control={form.control}
                      name="consistency"
                      render={({ field }) => (
                        <MultiSelect
                          variant="default"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          maxCount={1}
                          placeholder="select"
                          options={[
                            {
                              value: "Thin/Watery",
                              label: "Thin/Watery",
                            },
                            { value: "Thick", label: "Thick" },
                            {
                              value: "Viscous/Sticky",
                              label: "Viscous/Sticky",
                            },
                            {
                              value: "Contains debris",
                              label: "Contains debris",
                            },
                            { value: "Clots present", label: "Clots present" },
                            {
                              value: "Stones present",
                              label: "Stones present",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    {form.formState.errors.consistency && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.consistency.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverFilter;
