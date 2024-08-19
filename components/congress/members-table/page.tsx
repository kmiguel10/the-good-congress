import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  members: CongressMemberTable[];
}

export default function CongressTable({ members }: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={members} />
    </div>
  );
}
