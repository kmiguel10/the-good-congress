"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrgsTableDataType>[] = [
  {
    accessorKey: "orgName",
    header: "Organization",
  },
  {
    accessorKey: "indiv",
    header: "Individual",
  },
  {
    accessorKey: "pacs",
    header: "PAC",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
