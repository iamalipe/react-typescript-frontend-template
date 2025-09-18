import { AsyncRefreshButton } from "@/components/custom/async-button";
import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import SearchInput from "@/components/data-table/search-input";
import { Button } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/hooks/useDataTable";
import { validateAndStringify } from "@/lib/generic-validation";
import { sleep } from "@/lib/utils";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { dialogStateZodSchema } from "../private-admin-route";

export type ActionControlsProps<T> = {
  dataTable: DataTable<T>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable } = props;

  const navigate = useNavigate({ from: "/admin/product" });
  const router = useRouter();
  const searchParam = useSearch({
    from: "/admin/product",
  });

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

  const onSearchChange = async (searchValue: string) => {
    console.log("onSearchChange");
    await sleep(2000);
    navigate({
      search: (prev) => ({
        ...prev,
        search: searchValue,
      }),
    });
  };

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
        <SearchInput value={searchParam.search} onChange={onSearchChange} />
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
