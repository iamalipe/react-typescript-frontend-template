import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { DataTable, DataTableColumnFinal } from "@/hooks/useDataTable";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableHead } from "../ui/table";

export type TableSortHeaderProps<T> = {
  dataTable: DataTable<T>;
  item: DataTableColumnFinal<T>;
};

const TableSortHeader = <T,>(props: TableSortHeaderProps<T>) => {
  const { dataTable, item } = props;

  const findSortIndex =
    dataTable.sort?.findIndex((sort) => sort.orderBy === item.key) ?? -1;

  const ordered =
    findSortIndex !== -1 ? dataTable.sort?.[findSortIndex].order : undefined;

  return (
    <TableHead key={item.id} className={cn([item.classNameHeader])}>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{item.label}</span>
              {ordered === "asc" ? (
                <ArrowUp />
              ) : ordered === "desc" ? (
                <ArrowDown />
              ) : (
                <ChevronsUpDown />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              isTableHeader
              className={cn({ "text-primary": ordered === "asc" })}
              onClick={() =>
                ordered === "asc"
                  ? dataTable.onSortingChange?.([])
                  : dataTable.onSortingChange?.([
                      {
                        orderBy: item.key as string,
                        order: "asc",
                      },
                    ])
              }
            >
              <ArrowUp
                className={cn("h-3.5 w-3.5 text-muted-foreground/70", {
                  "text-primary": ordered === "asc",
                })}
              />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              isTableHeader
              className={cn({ "text-primary": ordered === "desc" })}
              onClick={() =>
                ordered === "desc"
                  ? dataTable.onSortingChange?.([])
                  : dataTable.onSortingChange?.([
                      {
                        orderBy: item.key as string,
                        order: "desc",
                      },
                    ])
              }
            >
              <ArrowDown
                className={cn("h-3.5 w-3.5 text-muted-foreground/70", {
                  "text-primary": ordered === "desc",
                })}
              />
              Desc
            </DropdownMenuItem>
            {item.isHidable && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  isTableHeader
                  onClick={() => item.toggleVisibility(false)}
                >
                  <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Hide
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableHead>
  );
};

export default TableSortHeader;
