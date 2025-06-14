import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable as DataTableType } from "@/hooks/useDataTable";
import TableSortHeader from "./table-sort-header";
import { cn } from "@/lib/utils";

export type DataTableProps<T> = {
  dataTable: DataTableType<T>;
};

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { dataTable } = props;

  return (
    <>
      <DataTableMobile dataTable={dataTable} />
      <Table>
        <TableHeader className="z-10">
          <TableRow className="border-b-0 table-header-box-shadow">
            {dataTable.columns
              .filter((item) => item.columnVisibility)
              .map((item) =>
                item.isSortable ? (
                  <TableSortHeader
                    dataTable={dataTable}
                    key={item.id}
                    item={item}
                  />
                ) : (
                  <TableHead className="min-w-10" key={item.id}>
                    {item.labelRender ? item.labelRender(item) : item.label}
                  </TableHead>
                )
              )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataTable.rows.map((item) => (
            <TableRow key={item.id as string}>
              {dataTable.columns
                .filter((item) => item.columnVisibility)
                .map((colItem) => (
                  <TableCell key={colItem.id}>
                    {colItem.render(item.data)}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
const DataTableMobile = <T,>(props: DataTableProps<T>) => {
  const { dataTable } = props;

  const columnVisibility = dataTable.columns.filter(
    (item) => item.columnVisibility
  );

  return (
    <>
      <div className="flex flex-col md:hidden relative w-full overflow-auto flex-1 scrollbar-thin gap-4">
        {dataTable?.rows.map((item) => (
          <div key={item.id} className="px-2 flex flex-col rounded-md border">
            {columnVisibility.map((colItem, index) => (
              <div
                key={colItem.id}
                className={cn([
                  "p-2 flex",
                  columnVisibility.length - 1 !== index && "border-b",
                ])}
              >
                <div className="w-2/5">{colItem.label}</div>
                <div className="text-sm text-muted-foreground w-3/5">
                  {colItem.render(item.data)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DataTable;