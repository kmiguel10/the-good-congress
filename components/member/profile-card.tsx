import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useCIDFromOpenSecrets } from "@/app/hooks/useCIDFromOpenSecrets";
import { ProfileCardSkeleton } from "../global/profile-skeleton";

type PartyVariant = "republican" | "democratic" | "independent" | "default";

interface Props {
  memberInfo?: MemberInfo;
  isLoading: boolean;
}

const getPartyVariant = (partyName: string | undefined): PartyVariant => {
  switch (partyName?.toLowerCase()) {
    case "republican":
      return "republican";
    case "democratic":
      return "democratic";
    case "independent":
      return "independent";
    default:
      return "default";
  }
};

const MemberImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div className="py-2">
    <img
      src={imageUrl || "/default-image.jpg"}
      alt="Picture of the member"
      width={100}
      height={100}
      className="circular-image"
    />
  </div>
);

const MemberInfo: React.FC<{
  name: string;
  party: string;
  partyVariant: PartyVariant;
  chamber: string;
  state: string;
  district?: number;
}> = ({ name, party, partyVariant, chamber, state, district }) => (
  <div>
    <div className="text-md font-semibold">{name}</div>
    <div className="text-md font-normal">
      <Badge variant={partyVariant}>{party}</Badge>
    </div>
    <div className="text-sm font-light">{chamber}</div>
    <div className="text-sm font-light">{`${state} ${district}`}</div>
  </div>
);

const ProfileCard: React.FC<Props> = ({ memberInfo, isLoading }) => {
  if (isLoading || !memberInfo) {
    return <ProfileCardSkeleton />;
  }

  const currentTerm = memberInfo.terms[memberInfo.terms.length - 1];
  const currentPartyHistory =
    memberInfo.partyHistory[memberInfo.partyHistory.length - 1];
  const partyVariant = getPartyVariant(currentPartyHistory?.partyName);

  return (
    <Card>
      <CardContent className="pl-4">
        <div className="flex items-center justify-evenly pt-4">
          <MemberImage imageUrl={memberInfo.depiction.imageUrl} />
          <MemberInfo
            name={memberInfo.directOrderName}
            party={currentPartyHistory?.partyName}
            partyVariant={partyVariant}
            chamber={currentTerm?.chamber}
            state={memberInfo.state}
            district={currentTerm?.district}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
