import { CopyMeType } from "@/api/copy-me-api";
import FormController from "@/components/form/form-controller";
import FormSelectInputController from "@/components/form/form-select-input-controller";
import FormSwitchController from "@/components/form/form-switch-controller";
import { Button, Textarea } from "@/components/ui";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiQuery from "@/hooks/use-api-query";
import useQueryLoadingState from "@/hooks/use-query-loading-state";
import { cn } from "@/lib/utils";
import { DialogStateType } from "@/routes/private/private-route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DialogSkeleton from "./dialog-skeleton";
import DialogViewMode from "./dialog-view-mode";

const formSchema = z.object({
  stringField: z.string().min(5).max(255),
  bigStringField: z.string().min(2).max(1000),
  numberField: z.coerce.number().int().gt(0),
  floatField: z.coerce.number().gt(0),
  enumField: z.enum(["A", "B", "C"]),
  booleanField: z.boolean(),
  objectField: z.object({
    key1: z.enum(["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]),
    key2: z.coerce.number().gt(0),
  }),
  // arrayField: z.array(z.string()), // multiselect
  // dateField: z.string().datetime(), // date select
  // datetimeField: z.string().datetime(), // datetime select
  // arrayOfObjectsField: z.array( // custom component
  //   z.object({
  //     name: z.string(),
  //     value: z.number(),
  //   })
  // ),
});
type FormSchemaType = z.infer<typeof formSchema>;

export type CopyMeDialogProps = {
  state: DialogStateType;
  data?: CopyMeType;
};
const CopyMeDialog = ({ state }: CopyMeDialogProps) => {
  const copyMeQuery = state.id ? apiQuery.copyMe.useGet(state.id) : undefined;
  const { isLoading } = useQueryLoadingState(copyMeQuery ? [copyMeQuery] : []);

  if (isLoading) return <DialogSkeleton />;
  if (state.mode === "VIEW")
    return <DialogViewMode state={state} data={copyMeQuery?.data?.data} />;
  return <DialogMain state={state} data={copyMeQuery?.data?.data} />;
};

const DialogMain = ({ data }: CopyMeDialogProps) => {
  const navigate = useNavigate();

  const defaultValues: FormSchemaType = {
    stringField: data?.stringField ?? "",
    bigStringField: data?.bigStringField ?? "",
    numberField: data?.numberField ?? 0,
    floatField: data?.floatField ?? 0,
    enumField: data?.enumField ?? "A",
    booleanField: data?.booleanField ?? false,
    objectField: {
      key1: (data?.objectField?.key1 as any) ?? "GB",
      key2: data?.objectField?.key2 ?? 0,
    },
    // arrayField: [],
    // dateField: "",
    // datetimeField: "",
    // arrayOfObjectsField: [],
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const onClose = () => {
    form.reset();
    navigate({
      to: "/copy-me",
      search: (prev) => ({
        ...prev,
        ds: undefined,
      }),
    });
  };
  const onSubmit = async (values: FormSchemaType) => {
    try {
      const res = await apiQuery.copyMe.create({
        ...values,
        arrayField: [], // multiselect
        dateField: "", // date select
        datetimeField: "", // datetime select
        arrayOfObjectsField: [],
      });
      if (!res.success) {
        toast.error("Something wrong, please  ty again.");
        return;
      }
      toast.success("Record added.");
      onClose();
      console.log("res", res);
    } catch (err) {
      console.error(err);
    }
  };
  // console.dir(form.formState.errors, { depth: null });

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] px-2 md:px-4 sm:px-6">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae ipsum porro sapiente! Perferendis harum dolorem culpa
              perspiciatis incidunt labore laborum quae ratione at voluptatum.
              Nam porro delectus eos autem reiciendis?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 md:gap-4">
            {/* stringField */}
            <FormController
              form={form}
              name="stringField"
              label="String Field"
              render={({ field, isError, ariaDescribedby }) => (
                <Input
                  id={field.name}
                  type="text"
                  value={field.value as string}
                  name="stringField"
                  placeholder="Enter value"
                  className={cn([isError ? "border-destructive" : ""])}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />
            {/* numberField - floatField */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              {/* numberField */}
              <FormController
                form={form}
                name="numberField"
                label="Number Field"
                render={({ field, isError, ariaDescribedby }) => (
                  <Input
                    id={field.name}
                    type="number"
                    value={field.value as string}
                    name="numberField"
                    placeholder="Enter value"
                    className={cn([isError ? "border-destructive" : ""])}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    aria-invalid={isError}
                    aria-describedby={ariaDescribedby}
                  />
                )}
              />
              {/* floatField */}
              <FormController
                form={form}
                name="floatField"
                label="Float Field"
                render={({ field, isError, ariaDescribedby }) => (
                  <Input
                    id={field.name}
                    type="number"
                    value={field.value as string}
                    name="floatField"
                    placeholder="Enter value"
                    className={cn([isError ? "border-destructive" : ""])}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    aria-invalid={isError}
                    aria-describedby={ariaDescribedby}
                  />
                )}
              />
            </div>
            {/* enumField */}
            <FormController
              form={form}
              name="enumField"
              label="Enum Field"
              render={({ field, isError, ariaDescribedby }) => (
                <Select
                  value={field.value as string}
                  name="enumField"
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                >
                  <SelectTrigger
                    id={field.name}
                    className={cn([isError ? "border-destructive" : ""])}
                  >
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Value A</SelectItem>
                    <SelectItem value="B">Value B</SelectItem>
                    <SelectItem value="C">Value C</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {/* objectField.key1 - objectField.key2 - booleanField */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              {/* objectField.key1 - objectField.key2 */}
              <FormSelectInputController
                form={form}
                name="objectField.key2"
                nameSelect="objectField.key1"
                label="String Field"
                classNameSelect="w-32"
                options={[
                  { label: "Byte", value: "B" },
                  { label: "Kilobyte", value: "KB" },
                  { label: "Megabyte", value: "MB" },
                  { label: "Gigabyte", value: "GB" },
                  { label: "Terabyte", value: "TB" },
                  { label: "Petabyte", value: "PB" },
                  { label: "Exabyte", value: "EB" },
                  { label: "Zettabyte", value: "ZB" },
                  { label: "Yottabyte", value: "YB" },
                ]}
                render={({ field, isError, ariaDescribedby }) => (
                  <Input
                    id={field.name}
                    type="number"
                    value={field.value as string}
                    name="floatField"
                    placeholder="Enter value"
                    className={cn([
                      "-ms-px rounded-s-none shadow-none",
                      isError ? "border-destructive" : "",
                    ])}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    aria-invalid={isError}
                    aria-describedby={ariaDescribedby}
                  />
                )}
              />
              {/* booleanField */}
              <FormSwitchController
                form={form}
                name="booleanField"
                label="Boolean Field"
                className="justify-center mt-4"
              />
            </div>
            {/* bigStringField */}
            <FormController
              form={form}
              name="bigStringField"
              label="Big String Field"
              maxLength={1000}
              render={({ field, isError, ariaDescribedby }) => (
                <Textarea
                  id={field.name}
                  value={field.value as string}
                  name="bigStringField"
                  placeholder="Enter value"
                  className={cn([isError ? "border-destructive" : ""])}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={isError}
                  aria-describedby={ariaDescribedby}
                />
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(onSubmit)} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CopyMeDialog;
