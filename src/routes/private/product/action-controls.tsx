import { AsyncRefreshButton } from "@/components/custom/async-button";
import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import { Button } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/hooks/useDataTable";
import { validateAndStringify } from "@/lib/generic-validation";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { dialogStateZodSchema } from "../private-route";

export type ActionControlsProps<T> = {
  dataTable: DataTable<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable } = props;

  const navigate = useNavigate({ from: "/product" });
  const router = useRouter();

  const onRefresh = async () => {
    await router.invalidate({ sync: true });
  };

  const onCreate = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "Product",
      mode: "CREATE",
    });
    if (!ds) return;
    navigate({
      search: (prev) => ({
        ...prev,
        ds: ds,
      }),
    });
  };

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button
          title="Create New"
          size="icon"
          variant="outline"
          onClick={onCreate}
        >
          <Plus />
        </Button>
        <AsyncRefreshButton
          title="Refresh"
          variant="outline"
          onClick={onRefresh}
        />
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
