import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/hooks/useDataTable";

export type ActionControlsProps<T> = {
  dataTable: DataTable<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable } = props;

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
      </div>
      <div className="flex gap-2 md:gap-4">
        {/* <DialogForm /> */}
        <Button>
          Add
          {/* <Link to="/artist/new">Add</Link> */}
        </Button>
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
