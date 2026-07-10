import type { ApiCopyMeGetAll } from "@/api/copy-me-api";
import { AsyncRefreshButton } from "@/components/custom/async-button";
import ColumnsViewControls from "@/components/data-table/columns-view-controls";
import SearchInput from "@/components/data-table/search-input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { DataTableType } from "@/hooks/useDataTable";
import { validateAndStringify } from "@/lib/generic-validation";
import type { ApiNormalResponse, TableConfigType } from "@/types/generic-type";
import type { UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { dialogStateZodSchema } from "../private-admin-route";

export type ActionControlsProps<T> = {
  dataTable: DataTableType<T>;
  rawQuery: UseQueryResult<ApiCopyMeGetAll, ApiNormalResponse | Error>;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable, rawQuery } = props;
  const queryData = rawQuery.data;
  if (!queryData) throw Error("Something wrong");

  const navigate = useNavigate({ from: "/admin/copy-me" });
  const searchParam = useSearch({
    from: "/admin/copy-me",
  });

  const onRefresh = async () => {
    await rawQuery.refetch();
  };

  const onCreate = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "CopyMe",
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

  const onAllRecords = async () => {
    const ds = validateAndStringify(dialogStateZodSchema, {
      dialog: "CopyMe",
      mode: "VIEW-ALL",
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

  const tableConfig: TableConfigType = queryData.config || {
    search: true,
    searchPlaceholder: "Search...",
  };

  return (
    <div className="flex flex-none justify-between">
      <div className="flex gap-2">
        <SidebarTrigger variant="outline" />
        {tableConfig.search && (
          <SearchInput
            value={searchParam.search}
            onChange={onSearchChange}
            placeholder={tableConfig.searchPlaceholder}
          />
        )}
      </div>
      <div className="flex gap-2">
        <Button title="All Records" variant="outline" onClick={onAllRecords}>
          All Records
        </Button>
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
