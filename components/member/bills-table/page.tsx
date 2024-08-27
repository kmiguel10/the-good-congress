import { TableSkeleton } from "@/components/global/table-skeleton";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  bills: BillDataType[];
  isLoading: boolean;
}

export default function BillsTable({ bills, isLoading }: Props) {
  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <div className="container px-2 py-2">
      <DataTable columns={columns} data={bills} />
    </div>
  );
}
