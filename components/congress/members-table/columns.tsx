"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CongressMemberTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        className="underline decoration-sky-600 hover:text-purple-600"
        href={`/members/${row.original.bioguideId}`}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "chamber",
    header: "Chamber",
  },
  {
    accessorKey: "party",
    header: "Party",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "district",
    header: "District",
  },
];
