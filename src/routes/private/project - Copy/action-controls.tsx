import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { DataTable } from "@/hooks/useDataTable";
import DialogForm from "./dialog-form";

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
        <DialogForm />
        <Button>
          <Link to="/artist/new">Add</Link>
        </Button>
        <Button>
          <Link
            to="/artist"
            search={(prev) => ({
              ...prev,
              mode: "CREATE",
            })}
          >
            Add NEww
          </Link>
        </Button>
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
