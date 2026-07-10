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
import { validateAndStringify } from "@/lib/generic-validation";
import { useNavigate } from "@tanstack/react-router";
import { dialogStateZodSchema } from "../../private-admin-route";
import { Separator } from "@/components/ui/separator";
import type { CopyMeDialogProps } from "./copy-me-dialog";
import { formatDate } from "@/lib/date-time";
import { Badge } from "@/components/ui/badge";

const DialogViewMode = ({ data }: CopyMeDialogProps) => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate({
      to: "/admin/copy-me",
      search: (prev) => ({
        ...prev,
        ds: undefined,
      }),
    });
  };

  const onEdit = () => {
    if (!data) return;
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "CopyMe",
      id: data._id,
      mode: "UPDATE",
    });

    if (!ds) return;
    navigate({
      to: "/admin/copy-me",
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
          className="md:max-w-[700px] px-2 md:px-6 sm:px-4 flex flex-col sm:max-h-[90vh] overflow-hidden"
          aria-live="polite"
          aria-busy="false"
        >
          <DialogHeader className="flex-none">
            <DialogTitle>View Copy-Me Reference Template</DialogTitle>
            <DialogDescription>
              Detailed view of all data fields stored in this copy-paste model. This is used as a technical implementation reference.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col overflow-auto flex-1 px-2 space-y-4 pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ViewField label="Required String">
                <span>{data?.stringRequired}</span>
              </ViewField>
              <ViewField label="Optional String">
                <span>{data?.stringOptional || "N/A"}</span>
              </ViewField>
              <ViewField label="Decimal Number">
                <span>{data?.numberDecimal}</span>
              </ViewField>
              <ViewField label="Integer Number">
                <span>{data?.numberInt}</span>
              </ViewField>
              <ViewField label="Slider Number">
                <span>{data?.numberSlider}</span>
              </ViewField>
              <ViewField label="Boolean Switch">
                <span>{data?.booleanSwitch ? "Yes" : "No"}</span>
              </ViewField>
              <ViewField label="Enum Status">
                <Badge variant="outline">{data?.enumString}</Badge>
              </ViewField>
              <ViewField label="Custom Option/Write-In">
                <span>{data?.customOptionalString}</span>
              </ViewField>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ViewField label="Date Only">
                <span>{data?.dateOnly ? formatDate(data.dateOnly) : "N/A"}</span>
              </ViewField>
              <ViewField label="Date and Time">
                <span>{data?.dateTime ? formatDate(data.dateTime) : "N/A"}</span>
              </ViewField>
              <ViewField label="Date Range">
                <span>
                  {data?.dateRangeStart && data?.dateRangeEnd
                    ? `${formatDate(data.dateRangeStart)} - ${formatDate(data.dateRangeEnd)}`
                    : "N/A"}
                </span>
              </ViewField>
              <ViewField label="Date-Time Range">
                <span>
                  {data?.dateTimeRangeStart && data?.dateTimeRangeEnd
                    ? `${formatDate(data.dateTimeRangeStart)} - ${formatDate(data.dateTimeRangeEnd)}`
                    : "N/A"}
                </span>
              </ViewField>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ViewField label="Uploaded Image">
                {data?.fileImage ? (
                  <a
                    href={data.fileImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline font-medium truncate max-w-[200px]"
                  >
                    View Image URL
                  </a>
                ) : (
                  <span>No image uploaded</span>
                )}
              </ViewField>
              <ViewField label="Uploaded Document (PDF)">
                {data?.fileDoc ? (
                  <a
                    href={data.fileDoc}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline font-medium truncate max-w-[200px]"
                  >
                    Download PDF URL
                  </a>
                ) : (
                  <span>No document uploaded</span>
                )}
              </ViewField>
            </div>

            <Separator />

            <div className="space-y-4">
              <ViewField label="Required Textarea (Multiline)" block>
                {data?.stringTextarea}
              </ViewField>
              {data?.stringTextareaOptional && (
                <ViewField label="Optional Textarea" block>
                  {data.stringTextareaOptional}
                </ViewField>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primitive String Array</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {data?.singleArray && data.singleArray.length > 0 ? (
                    data.singleArray.map((str, idx) => (
                      <Badge key={idx} variant="secondary">
                        {str}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Empty array</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Array of Key-Value Objects</p>
                <div className="mt-1 border rounded-md overflow-hidden bg-muted/30">
                  {data?.arrayObject && data.arrayObject.length > 0 ? (
                    <table className="min-w-full divide-y divide-muted text-sm text-left">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-3 py-1.5 font-medium">Label</th>
                          <th className="px-3 py-1.5 font-medium">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-muted">
                        {data.arrayObject.map((obj, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-1.5 font-mono">{obj.label}</td>
                            <td className="px-3 py-1.5 font-mono">{obj.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-3 text-center text-sm text-muted-foreground">Empty array</div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">2D Array Matrix</p>
                <div className="mt-1 font-mono text-sm bg-muted/40 p-2.5 rounded-md border text-left">
                  {data?.twoDArray ? JSON.stringify(data.twoDArray) : "[]"}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nested Configuration Object</p>
                <div className="mt-1 border rounded-md p-3 bg-muted/20 space-y-2">
                  <ViewField label="Nested Title">
                    <span>{data?.nestedObject?.title}</span>
                  </ViewField>
                  <ViewField label="Nested Priority">
                    <span>{data?.nestedObject?.priority}</span>
                  </ViewField>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-none gap-2 border-t pt-3 mt-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
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
      <div className="px-1 py-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="text-sm text-muted-foreground mt-1.5 px-3 py-2 bg-muted rounded-md border text-left">
          <p className="whitespace-pre-wrap">{children}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b pb-2 px-1 last:border-b-0">
      <p className="text-sm font-medium truncate text-muted-foreground">
        {label}
      </p>
      <div className="text-sm font-bold text-foreground text-right flex items-center justify-end gap-2 flex-shrink-0">
        {children}
      </div>
    </div>
  );
};
