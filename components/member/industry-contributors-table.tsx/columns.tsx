"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IndustryTableDataType>[] = [
  {
    accessorKey: "industry_name",
    header: "Industry",
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
