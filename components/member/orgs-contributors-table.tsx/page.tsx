"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  organizations: OrgsTableDataType[];
}

export default function OrgsTable({ organizations }: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={organizations} />
    </div>
  );
}
