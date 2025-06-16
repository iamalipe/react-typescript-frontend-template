import type { ProductType } from "@/api/product-api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumn } from "@/hooks/useDataTable";
import { formatDate } from "@/lib/date-time";
import { useProductDialogFormStore } from "@/store/use-dialog-form";

const tableColumns: DataTableColumn<ProductType>[] = [
  {
    key: "select",
    label: "Select",
    labelRender: () => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && "indeterminate")
        // }
        // onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    isSortable: false,
    isHidable: false,
    render: () => (
      <Checkbox
        // checked={row.getIsSelected()}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    label: "Name",
    key: "name",
    render: (item) => (
      <Button
        variant="link"
        onClick={() => useProductDialogFormStore.getState().onOpen(item)}
        className="hover:underline"
      >
        {item.name}
      </Button>
      // <Link
      //   to="/product/$id"
      //   params={{ id: item._id }}
      //   className="hover:underline"
      // >
      //   {item.name}
      // </Link>
    ),
    isSortable: true,
  },
  {
    label: "Slug",
    key: "slug",
    render: (item) => item.slug,
    isSortable: false,
  },
  {
    label: "Price",
    key: "price",
    render: (item) => item.price,
    isSortable: true,
  },
  {
    label: "Category",
    key: "category",
    render: (item) => item.category,
    isSortable: true,
  },
  {
    label: "Description",
    key: "description",
    render: (item) => item.description,
    isSortable: false,
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (info) => formatDate(info.createdAt),
    isSortable: true,
  },
];

export default tableColumns;
