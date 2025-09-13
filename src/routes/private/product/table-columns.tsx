import { ProductType } from "@/api/product-api";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumn } from "@/hooks/useDataTable";
import { formatDate } from "@/lib/date-time";
import { TableAction } from "./table-action";

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
    classNameHeader: "w-10",
    classNameRow: "w-10",
  },
  {
    label: "Name",
    key: "name",
    render: (item) => item.name,
    isSortable: true,
    classNameRow: "font-bold",
  },
  {
    label: "Category",
    key: "category",
    render: (item) => item.category,
    isSortable: true,
  },
  {
    label: "Price",
    key: "price",
    render: (item) => item.price,
    isSortable: true,
  },
  {
    label: "Description",
    key: "description",
    render: (item) => item.description,
    isSortable: true,
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (info) => formatDate(info.createdAt),
    isSortable: true,
  },
  {
    label: "Action",
    key: "action",
    render: (info) => <TableAction data={info} />,
    isSortable: false,
    classNameHeader: "w-10",
    classNameRow: "w-10",
  },
];

export default tableColumns;
