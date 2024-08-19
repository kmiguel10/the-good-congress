"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = {
  name: string;
  chamber: string;
  party: string;
  state: string;
  district: number;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
