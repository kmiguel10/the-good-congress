import { getCongressTableMembers } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CongressTable from "./members-table/page";

interface Props {
  members: Member[] | undefined;
}

export const CongressDashboard: React.FC<Props> = ({ members }) => {
  const [congressTableData, setCongressTableData] = useState<
    CongressMemberTable[]
  >([]);

  //filter members by putting it in a new shape

  useEffect(() => {
    if (members) {
      const filteredMembers = getCongressTableMembers(members);
      console.log("Filtered members: ", filteredMembers);
      setCongressTableData(filteredMembers);
    }
  }, [members]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 "></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CongressTable members={congressTableData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
