import { ApiProductGetAll } from "@/api/product-api";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import { useDataTable } from "@/hooks/useDataTable";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import { ApiNormalResponse } from "@/types/generic-type";
import { UseQueryResult } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import ActionControls from "./action-controls";
import { TableActionContextMenu, TableSelectAction } from "./table-action";
import tableColumns from "./table-columns";

type ProductProps = {
  rawQuery: UseQueryResult<ApiProductGetAll, ApiNormalResponse | Error>;
};
const Product = ({ rawQuery }: ProductProps) => {
  const queryData = rawQuery.data;
  if (!queryData) throw Error("Something wrong");

  const tableVisibility = useTableVisibility("product");

  const pagination = usePagination({
    initialPageSize: queryData.pagination.limit,
    initialPageIndex: queryData.pagination.page,
    routeFrom: "/admin/product",
  });

  const sort = useSort({
    initialSort: queryData.sort,
    routeFrom: "/admin/product",
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
      <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
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

export default Product;
