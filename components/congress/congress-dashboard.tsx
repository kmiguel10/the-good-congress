import { getHouseOfRepresentatives } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Props {
  members: Member[] | undefined;
}

export const CongressDashboard: React.FC<Props> = ({ members }) => {
  const [houseOfReps, setHouseOfReps] = useState<Member[]>([]);

  useEffect(() => {
    if (members) {
      const filteredMembers = getHouseOfRepresentatives(members);
      console.log("Filtered members: ", filteredMembers);
      setHouseOfReps(filteredMembers);
    }
  }, [members]);

  //Filter members based on chamber
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div>Text</div>
        </div>
      </div>
    </div>
  );
};
