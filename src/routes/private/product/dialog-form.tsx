import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { ComboboxSelect } from "@/components/general/combobox-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductDialogFormStore } from "@/store/use-dialog-form";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.string().min(2).max(100),
  price: z.number().min(0),
  description: z.string().max(1000),
});

const DialogForm = () => {
  const { data, onClose, open } = useProductDialogFormStore((state) => state);
  console.log("DialogForm", data);

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log("onSubmit", value);
    },
  });

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog open={open} aria-labelledby="dialog-title" onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-4 py-4 max-h-[500px] overflow-auto scrollbar-thin"
        >
          <form.Field
            name="name"
            children={(field) => (
              <FormInput
                label="Name"
                field={field}
                info={["Name is required"]}
              />
            )}
          />
          <form.Field
            name="category"
            children={(field) => (
              <FormSelect
                label="Category"
                field={field}
                options={Array.from({ length: 500 }, (_, index) => ({
                  value: `value-${index + 1}`,
                  label: `label-${index + 1}`,
                }))}
              />
            )}
          />
          <form.Field
            name="price"
            children={(field) => (
              <FormInput label="Price" field={field} type="number" />
            )}
          />
          <form.Field
            name="description"
            children={(field) => (
              <FormTextarea label="Description" field={field} />
            )}
          />
          <ComboboxSelect
            options={Array.from({ length: 500 }, (_, index) => ({
              value: `value-${index + 1}`,
              label: `label-${index + 1}`,
            }))}
            notFoundMessage="No match found"
            placeholder="Select a product"
          />
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} type="button">
            Close
          </Button>
          <Button onClick={() => form.handleSubmit()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
