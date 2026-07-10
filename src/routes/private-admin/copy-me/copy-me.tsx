import type { ApiCopyMeGetAll } from "@/api/copy-me-api";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import { useDataTable } from "@/hooks/useDataTable";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import type { ApiNormalResponse } from "@/types/generic-type";
import type { UseQueryResult } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import ActionControls from "./action-controls";
import { TableActionContextMenu, TableSelectAction } from "./table-action";
import tableColumns from "./table-columns";

type CopyMeProps = {
  rawQuery: UseQueryResult<ApiCopyMeGetAll, ApiNormalResponse | Error>;
};

const CopyMe = ({ rawQuery }: CopyMeProps) => {
  const queryData = rawQuery.data;
  if (!queryData) throw Error("Something wrong");

  const tableVisibility = useTableVisibility("copyMe");

  const pagination = usePagination({
    initialPageSize: queryData.pagination.limit,
    initialPageIndex: queryData.pagination.page,
    routeFrom: "/admin/copy-me",
  });

  const sort = useSort({
    initialSort: queryData.sort,
    routeFrom: "/admin/copy-me",
  });

  const dataTable = useDataTable({
    data: queryData.data,
    columns: tableColumns,
    rowCount: queryData.pagination.total,
    paginationState: pagination.state,
    columnVisibility: tableVisibility.state,
    onToggleVisibilityChange: tableVisibility.toggleVisibility,
    sortState: sort.state,
    onPaginationChange: pagination.onPaginationChange,
    onSortingChange: sort.onSortChange,
  });

  return (
    <>
      <main className="flex-1 overflow-hidden flex flex-col p-2 pl-0 gap-2">
        <ActionControls rawQuery={rawQuery} dataTable={dataTable} />
        <DataTable
          dataTable={dataTable}
          contextMenu={(data) => <TableActionContextMenu data={data} />}
        />
        <TableFooter dataTable={dataTable} />
        <TableSelectAction />
      </main>
      <Outlet />
    </>
  );
};

export default CopyMe;
