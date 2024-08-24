import { getCongressTableMembers } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TableSkeleton } from "../global/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CongressTable from "./members-table/page";

interface Props {
  currentCongress: string;
}

export const CongressDashboard: React.FC<Props> = ({ currentCongress }) => {
  const [congressTableData, setCongressTableData] = useState<
    CongressMemberTable[]
  >([]);
  const [isCongressTableLoading, setIsCongressTableLoading] = useState(false);

  //filter members by putting it in a new shape

  //Fetch the current members of this congress
  useEffect(() => {
    const fetchCurrentMembers = async () => {
      try {
        setIsCongressTableLoading(true);
        const response = await fetch(
          `/api/opengov/member/congress/${currentCongress}`
        );
        const data: Member[] = await response.json();

        const filteredMembers = getCongressTableMembers(data);
        console.log("Filtered members: ", filteredMembers);
        setCongressTableData(filteredMembers);
        setIsCongressTableLoading(false);
      } catch (error) {
        console.error("Error fetching current members: ", error);
        setIsCongressTableLoading(false);
      }
    };

    if (currentCongress) {
      fetchCurrentMembers();
    }
  }, [currentCongress]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 "></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {isCongressTableLoading && <TableSkeleton />}
            {!isCongressTableLoading && (
              <CongressTable members={congressTableData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
