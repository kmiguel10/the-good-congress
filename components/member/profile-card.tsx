import React from "react";
import CongressTable from "../congress/members-table/page";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Props {
  memberInfo: MemberInfo | undefined;
}

const ProfileCard: React.FC<Props> = ({ memberInfo }) => {
  const terms: number = memberInfo?.terms.length || 0;
  const currentTerm = memberInfo?.terms[terms - 1];
  const partyHistory = memberInfo?.partyHistory.length || 0;
  const currentPartyHistory = memberInfo?.partyHistory[partyHistory - 1];

  return (
    <Card>
      <CardContent className="pl-4">
        <div className="flex items-center justify-evenly">
          <div className="py-2">
            {memberInfo?.depiction.imageUrl && (
              <img
                src={memberInfo?.depiction?.imageUrl || "/default-image.jpg"}
                alt="Picture of the author"
                width={100}
                height={100}
                className="circular-image"
              />
            )}
          </div>
          <div>
            <div className="text-md font-semibold">
              {memberInfo?.directOrderName}
            </div>
            <div className="text-md font-semibold">
              {`${currentPartyHistory?.partyName}`}
            </div>
            <div className="text-md font-semibold">
              {`${currentTerm?.chamber}`}
            </div>
            <div className="text-md font-semibold">
              {`${memberInfo?.state} ${currentTerm?.district}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
