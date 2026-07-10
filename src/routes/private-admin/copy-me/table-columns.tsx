import type { CopyMeType } from "@/api/copy-me-api";
import type { DataTableColumn } from "@/hooks/useDataTable";
import { formatDate } from "@/lib/date-time";
import { TableAction, TableRowsSelect } from "./table-action";
import { Badge } from "@/components/ui/badge";

const tableColumns: DataTableColumn<CopyMeType>[] = [
  {
    key: "select",
    label: "Select",
    labelRender: () => <TableRowsSelect type="header" />,
    isSortable: false,
    isHidable: false,
    render: (record) => <TableRowsSelect type="row" data={record} />,
    classNameHeader: "w-10",
    classNameRow: "w-10",
  },
  {
    label: "Required String",
    key: "stringRequired",
    render: (record) => record.stringRequired,
    isSortable: true,
    classNameRow: "font-bold",
  },
  {
    label: "Enum Status",
    key: "enumString",
    render: (record) => (
      <Badge variant="outline" className="capitalize">
        {record.enumString}
      </Badge>
    ),
    isSortable: true,
  },
  {
    label: "Decimal",
    key: "numberDecimal",
    render: (record) => record.numberDecimal.toString(),
    isSortable: true,
  },
  {
    label: "Boolean Switch",
    key: "booleanSwitch",
    render: (record) => (record.booleanSwitch ? "Yes" : "No"),
    isSortable: true,
  },
  {
    label: "Date Only",
    key: "dateOnly",
    render: (record) => formatDate(record.dateOnly),
    isSortable: true,
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (record) => formatDate(record.createdAt),
    isSortable: true,
  },
  {
    label: "Action",
    key: "action",
    render: (record) => <TableAction data={record} />,
    isSortable: false,
    classNameHeader: "w-10",
    classNameRow: "w-10",
  },
];

export default tableColumns;
