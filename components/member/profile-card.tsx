import React from "react";
import CongressTable from "../congress/members-table/page";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Props {
  memberInfo: MemberInfo | undefined;
}

const ProfileCard: React.FC<Props> = ({ memberInfo }) => {
  const terms = memberInfo?.terms.length || 0;
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>{memberInfo?.directOrderName}</CardTitle>
      </CardHeader> */}
      <CardContent className="pl-2">
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
            {memberInfo?.terms[terms - 1].chamber}
          </div>
          <div className="text-md font-semibold">{memberInfo?.state}</div>
          <div className="text-md font-semibold">
            {memberInfo?.terms[terms - 1].district}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
