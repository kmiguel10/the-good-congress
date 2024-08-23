import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  bills: BillDataType[];
}

export default function BillsTable({ bills }: Props) {
  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={bills} />
    </div>
  );
}
