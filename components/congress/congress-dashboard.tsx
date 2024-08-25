import { getCongressTableMembers } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TableSkeleton } from "../global/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CongressTable from "./members-table/page";
import { useCongressMembers } from "@/app/hooks/useCongressMembers";

interface Props {
  currentCongress: string;
}

export const CongressDashboard: React.FC<Props> = ({ currentCongress }) => {
  const { congressTableData, isLoading, isDataReady } =
    useCongressMembers(currentCongress);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading && <TableSkeleton />}
            {!isLoading && isDataReady && congressTableData && (
              <CongressTable members={congressTableData} />
            )}
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Contributions</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-center">
              Coming soon...
            </h4>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
