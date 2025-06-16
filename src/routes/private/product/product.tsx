// import DataTable from "@/components/data-table/data-table";
// import TableFooter from "@/components/data-table/table-footer";
import PageBreadcrumb from "@/components/general/page-breadcrumb";
import { useDataTable } from "@/hooks/useDataTable";
import usePagination from "@/hooks/usePagination";
import useSort from "@/hooks/useSort";
import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
// import { useDataTable } from "@/hooks/useDataTable";
// import usePagination from "@/hooks/usePagination";
// import useSort from "@/hooks/useSort";
// import ActionControls from "@/routes/private/project/action-controls";
// import { useTableVisibility } from "@/store/use-table-columns-visibility-store";
import { getRouteApi } from "@tanstack/react-router";

import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import ActionControls from "./action-controls";
import tableColumns from "./table-columns";

const routeApi = getRouteApi("/_private/product");
const Product = () => {
  const routeData = routeApi.useLoaderData();

  const tableVisibility = useTableVisibility("product");

  const pagination = usePagination({
    initialPageSize: routeData.data?.limit,
    initialPageIndex: routeData.data?.page,
    routeFrom: "/product",
  });

  const sort = useSort({
    initialSort: {
      orderBy: routeData.data?.orderBy,
      order: routeData.data?.order,
    },
    routeFrom: "/product",
  });

  const dataTable = useDataTable({
    data: routeData.data.data,
    columns: tableColumns,
    rowCount: routeData?.data?.total,
    paginationState: pagination.state,
    columnVisibility: tableVisibility.state,
    onToggleVisibilityChange: tableVisibility.toggleVisibility,
    sortState: sort.state,
    onPaginationChange: pagination.onPaginationChange,
    onSortingChange: sort.onSortChange,
  });

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <PageBreadcrumb />
      <ActionControls dataTable={dataTable} />
      <DataTable dataTable={dataTable} />
      <TableFooter dataTable={dataTable} />
    </main>
  );
};

export default Product;
