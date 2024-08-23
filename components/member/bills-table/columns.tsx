"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BillDataType>[] = [
  {
    accessorKey: "billNumber",
    header: "Bill",
  },
  {
    accessorKey: "amendmentNumber",
    header: "Amendment",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "introducedDate",
    header: "Introduced",
    cell: ({ row }) => {
      let date: Date = row.getValue("introducedDate");
      let formattedDate = formatDate(date.toString());

      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "latestAction",
    header: "Action",
  },
];
