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
import { Plus, SlidersHorizontal } from "lucide-react";
import { dialogStateZodSchema } from "../private-admin-route";

export type ActionControlsProps<T> = {
  dataTable: DataTableType<T>;
  rawQuery: UseQueryResult<ApiCopyMeGetAll, ApiNormalResponse | Error>;
  onFilterClick: () => void;
};

const ActionControls = <T,>(props: ActionControlsProps<T>) => {
  const { dataTable, rawQuery, onFilterClick } = props;
  const queryData = rawQuery.data;
  if (!queryData) throw Error("Something wrong");

  const navigate = useNavigate({ from: "/admin/copy-me" });
  const searchParam = useSearch({
    from: "/admin/copy-me",
  }) as any;

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

  const hasActiveFilters = !!(searchParam.enumString || searchParam.booleanSwitch);

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
        <Button
          title="Filters"
          variant={hasActiveFilters ? "default" : "outline"}
          onClick={onFilterClick}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </Button>
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
        >
          Refresh
        </AsyncRefreshButton>
        <ColumnsViewControls dataTable={dataTable} />
      </div>
    </div>
  );
};

export default ActionControls;
