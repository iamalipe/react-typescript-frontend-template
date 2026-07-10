import type { CopyMeType } from "@/api/copy-me-api";
import DataTable from "@/components/data-table/data-table";
import TableFooter from "@/components/data-table/table-footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiQuery from "@/hooks/use-api-query";
import useQueryLoadingState from "@/hooks/use-query-loading-state";
import { useDataTable } from "@/hooks/useDataTable";
import usePaginationClientSide from "@/hooks/usePaginationClientSide";
import useSortClientSide from "@/hooks/useSortClientSide";
import type { DialogStateType } from "@/routes/private-admin/private-admin-route";
import { useNavigate } from "@tanstack/react-router";
import tableColumns from "../table-columns";
import DialogSkeleton from "../dialog/dialog-skeleton";

export type CopyMeDialogProps = {
  state: DialogStateType;
  data?: CopyMeType[];
};

const CopyMeDialogAll = ({ state }: CopyMeDialogProps) => {
  const recordQuery = apiQuery.copyMe.useGetAll({ page: 0, limit: 100 });
  const { isLoading } = useQueryLoadingState([recordQuery]);

  if (isLoading) return <DialogSkeleton />;

  return <DialogMain state={state} data={recordQuery?.data?.data} />;
};

export default CopyMeDialogAll;

const DialogMain = ({ data }: CopyMeDialogProps) => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        ds: undefined,
      }),
    });
  };

  const sort = useSortClientSide({
    data: data || [],
  });

  const pagination = usePaginationClientSide({
    initialPageSize: 10,
    initialPageIndex: 0,
    data: sort.sortedData,
  });

  const dataTable = useDataTable({
    data: pagination.paginatedData,
    columns: tableColumns,
    rowCount: pagination.total,
    paginationState: pagination.state,
    sortState: sort.state,
    onPaginationChange: pagination.onPaginationChange,
    onSortingChange: sort.onSortChange,
  });

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="sm:max-w-[1200px] flex flex-col sm:max-h-[80vh] px-2 md:px-4 sm:px-6">
          <DialogHeader className="flex-none">
            <DialogTitle>All Copy-Me Records</DialogTitle>
            <DialogDescription>
              A client-side paginated list of all Copy-Me records in the database, demonstrating how tables display nested fields like enum status and date formats.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden flex flex-col gap-2 md:gap-4">
            <DataTable dataTable={dataTable} />
            <TableFooter dataTable={dataTable} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
