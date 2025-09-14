import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { DataTable } from "@/hooks/useDataTable";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export type TablePaginationProps<T> = {
  dataTable: DataTable<T>;
};
const TablePagination = <T,>(props: TablePaginationProps<T>) => {
  const { dataTable } = props;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            title="Go to first page"
            disabled={!dataTable.getCanPreviousPage()}
            onClick={() =>
              dataTable.onPaginationChange((prev) => ({
                ...prev,
                pageIndex: 1,
              }))
            }
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            title="Go to previous page"
            disabled={!dataTable.getCanPreviousPage()}
            onClick={() =>
              dataTable.onPaginationChange((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem className="px-3">
          {dataTable.pagination.pageIndex}
        </PaginationItem>
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            title="Go to next page"
            disabled={!dataTable.getCanNextPage()}
            onClick={() =>
              dataTable.onPaginationChange((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            title="Go to last page"
            disabled={!dataTable.getCanNextPage()}
            onClick={() =>
              dataTable.onPaginationChange((prev) => ({
                ...prev,
                pageIndex: dataTable.pagination.totalPages,
              }))
            }
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
