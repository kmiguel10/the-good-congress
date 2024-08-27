import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  members: CongressMemberTable[];
}

export default function CongressTable({ members }: Props) {
  return (
    <div className="container px-2 py-10">
      <DataTable columns={columns} data={members} />
    </div>
  );
}
