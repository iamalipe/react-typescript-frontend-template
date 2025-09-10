import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import PageBreadcrumb from "@/components/general/page-breadcrumb";
import { useDataTable } from "@/hooks/useDataTable";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import { getRouteApi, Outlet } from "@tanstack/react-router";
import ActionControls from "./action-controls";
import { TableActionContextMenu } from "./table-action";
import tableColumns from "./table-columns";

const routeApi = getRouteApi("/_private/copy-me");
const CopyMe = () => {
  const routeData = routeApi.useLoaderData();

  const tableVisibility = useTableVisibility("project");

  const pagination = usePagination({
    initialPageSize: routeData.data.pagination.limit,
    initialPageIndex: routeData.data.pagination.page,
    routeFrom: "/copy-me",
  });

  const sort = useSort({
    // initialSort: routeData.data.sort,
    initialSort: [],
    routeFrom: "/copy-me",
  });

  const dataTable = useDataTable({
    data: routeData.data.data,
    columns: tableColumns,
    rowCount: routeData.data.pagination.total,
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
        {/* <CopyMeDialog /> */}
        <PageBreadcrumb />
        <ActionControls dataTable={dataTable} />
        <DataTable
          dataTable={dataTable}
          contextMenu={(data) => <TableActionContextMenu data={data} />}
        />
        <TableFooter dataTable={dataTable} />
      </main>
      <Outlet />
    </>
  );
};

export default CopyMe;
