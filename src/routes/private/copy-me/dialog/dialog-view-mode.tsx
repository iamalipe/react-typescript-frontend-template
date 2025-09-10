import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { validateAndStringify } from "@/lib/generic-validation";
import { useNavigate } from "@tanstack/react-router";
import { dialogStateZodSchema } from "../../private-route";
import { CopyMeDialogProps } from "./copy-me-dialog";

const DialogViewMode = ({ data }: CopyMeDialogProps) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate({
      to: "/copy-me",
      search: (prev) => ({
        ...prev,
        ds: undefined,
      }),
    });
  };

  const onEdit = () => {
    if (!data) return;
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Copy-Me",
      id: data._id,
      mode: "UPDATE",
    });

    if (!ds) return;
    navigate({
      to: "/copy-me",
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent
          className="md:max-w-[600px]  px-2 md:px-4 sm:px-6 flex flex-col sm:max-h-[90vh] overflow-hidden"
          aria-live="polite"
          aria-busy="true"
        >
          <DialogHeader className="flex-none">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae ipsum porro sapiente! Perferendis harum dolorem culpa
              perspiciatis incidunt labore laborum quae ratione at voluptatum.
              Nam porro delectus eos autem reiciendis?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col overflow-auto flex-1 px-2">
            {data?.stringField && (
              <ViewField label="String Field">
                <span>{data.stringField}</span>
              </ViewField>
            )}
            {data?.numberField && (
              <ViewField label="Number Field">
                <span>{data.numberField}</span>
              </ViewField>
            )}
            {data?.floatField && (
              <ViewField label="Float Field">
                <span>{data.floatField}</span>
              </ViewField>
            )}
            {data?.enumField && (
              <ViewField label="Enum Field">
                <span>{data.enumField}</span>
              </ViewField>
            )}
            {data?.objectField && (
              <ViewField label="Storage">
                <div className="flex items-center gap-2">
                  <span>{data.objectField.key2}</span>
                  <Badge variant="outline">{data.objectField.key1}</Badge>
                </div>
              </ViewField>
            )}
            {data?.booleanField !== undefined && (
              <ViewField label="Status">
                <Badge>{data.booleanField ? "Enabled" : "Disabled"}</Badge>
              </ViewField>
            )}
            {data?.bigStringField && (
              <ViewField label="Big String Field" block>
                {data.bigStringField}
              </ViewField>
            )}
          </div>
          <DialogFooter className="flex-none gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {data && <Button onClick={onEdit}>Edit</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogViewMode;

type ViewFieldProps = {
  label: string;
  children?: React.ReactNode;
  block?: boolean;
};
const ViewField = ({ label, children, block = false }: ViewFieldProps) => {
  if (block) {
    return (
      <div className="px-1 py-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-sm text-muted-foreground mt-2 px-3 py-2 bg-muted rounded-md border text-left">
          <p className="whitespace-pre-wrap">{children}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b px-1 py-2 last:border-b-0">
      <p className="text-sm font-medium truncate text-muted-foreground">
        {label}
      </p>
      <div className="text-sm font-bold text-foreground text-right flex items-center justify-end gap-2 flex-shrink-0">
        {children}
      </div>
    </div>
  );
};
