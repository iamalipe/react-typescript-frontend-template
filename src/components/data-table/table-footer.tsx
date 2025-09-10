import { DataTable } from "@/hooks/useDataTable";
import TablePagination from "./table-pagination";
import TableLimit from "./table-limit";

export type TableFooterProps<T> = {
  dataTable: DataTable<T>;
};
const TableFooter = <T,>(props: TableFooterProps<T>) => {
  const { dataTable } = props;

  return (
    <div className="flex items-center justify-between px-2 py-1 flex-none">
      <div className="text-xs text-muted-foreground flex flex-col">
        {/* <span>
          Selected: {0} of {dataTable.pagination.pageSize}
        </span> */}
        <span>
          Total : {dataTable.pagination.rowCount} • Page:{" "}
          {dataTable.pagination.pageIndex} of {dataTable.pagination.totalPages}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <TableLimit dataTable={dataTable} />
        <TablePagination dataTable={dataTable} />
      </div>
    </div>
  );
};

export default TableFooter;
