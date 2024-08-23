"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  industries: IndustryTableDataType[];
}

export default function IndustriesTable({ industries }: Props) {
  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={industries} />
    </div>
  );
}
