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
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("indiv"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "pacs",
    header: "PAC",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pacs"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left">{formatted}</div>;
    },
  },
];
