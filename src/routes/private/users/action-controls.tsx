import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/hooks/useDataTable";
import { useProductDialogFormStore } from "@/store/use-dialog-form";

export type ActionControlsProps<T> = {
  dataTable: DataTable<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable } = props;
  const onOpenForm = useProductDialogFormStore((state) => state.onOpen);

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
      </div>
      <div className="flex gap-2 md:gap-4">
        {/* <DialogForm /> */}
        <Button onClick={() => onOpenForm(null)}>Add</Button>
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
