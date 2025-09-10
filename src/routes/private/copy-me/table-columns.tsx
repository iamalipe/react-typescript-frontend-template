import { CopyMeType } from "@/api/copy-me-api";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumn } from "@/hooks/useDataTable";
import { formatDate } from "@/lib/date-time";
import { TableAction } from "./table-action";

const tableColumns: DataTableColumn<CopyMeType>[] = [
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
  // {
  //   label: "",
  //   key: "stringField",
  //   isSortable: true,
  //   isHidable: false,
  //   render: (info) => (
  //     <div className="flex items-center gap-2">
  //       <Avatar className="border h-8 w-8">
  //         <AvatarImage src={info.imageUrl || ""} />
  //         <AvatarFallback>CN</AvatarFallback>
  //       </Avatar>
  //       <Link
  //         to="/artist/$id"
  //         params={{ id: info.id }}
  //         className="hover:underline"
  //       >
  //         {info.name}
  //       </Link>
  //     </div>
  //   ),
  // },
  {
    label: "String Field",
    key: "stringField",
    render: (item) => item.stringField,
    isSortable: true,
    classNameRow: "font-bold",
  },
  {
    label: "Big String Field",
    key: "bigStringField",
    render: (item) => item.bigStringField,
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
