import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DataTable } from "@/hooks/useDataTable";

export type TableLimitProps<T> = {
  dataTable: DataTable<T>;
  limits?: number[];
};
const TableLimit = <T,>(props: TableLimitProps<T>) => {
  const { dataTable } = props;
  const limits = props.limits || [10, 25, 50, 100];

  const pageSize = dataTable.pagination.pageSize;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground text-right whitespace-nowrap">
        Rows Per
        <br />
        Page
      </span>
      <Select
        value={`${pageSize}`}
        onValueChange={(value) =>
          dataTable.onPaginationChange((prev) => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 1,
          }))
        }
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`${pageSize}`} />
        </SelectTrigger>
        <SelectContent side="top">
          {limits.map((limit, index) => (
            <SelectItem key={`${index}_${limit}`} value={`${limit}`}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableLimit;
