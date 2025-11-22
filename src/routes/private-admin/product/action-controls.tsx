import { AsyncRefreshButton } from "@/components/custom/async-button";
import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import SearchInput from "@/components/data-table/search-input";
import { Button } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/hooks/useDataTable";
import { validateAndStringify } from "@/lib/generic-validation";
import { TableConfigType } from "@/types/generic-type";
import {
  getRouteApi,
  useNavigate,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { dialogStateZodSchema } from "../private-admin-route";

export type ActionControlsProps<T> = {
  dataTable: DataTable<T>;
};
const routeApi = getRouteApi("/admin/product");
const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable } = props;
  const routeData = routeApi.useLoaderData();
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
    navigate({
      search: (prev) => ({
        ...prev,
        search: searchValue,
      }),
    });
  };

  const tableConfig: TableConfigType = routeData.data.config || {
    search: true,
    searchPlaceholder: "Search...",
  };

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2 md:gap-4">
        <SidebarTrigger variant="outline" />
        {tableConfig.search && (
          <SearchInput
            value={searchParam.search}
            onChange={onSearchChange}
            placeholder={tableConfig.searchPlaceholder}
          />
        )}
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button
          title="Create New"
          size="icon"
          variant="outline"
          data-testid="create-new-button"
          onClick={onCreate}
        >
          <Plus />
        </Button>
        <AsyncRefreshButton
          title="Refresh"
          variant="outline"
          onClick={onRefresh}
          data-testid="refresh-button"
        />
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
