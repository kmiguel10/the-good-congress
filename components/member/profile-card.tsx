import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useCIDFromOpenSecrets } from "@/app/hooks/useCIDFromOpenSecrets";
import { ProfileCardSkeleton } from "../global/profile-skeleton";
import { Separator } from "../ui/separator";

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
  currentLeadership?: string | null;
}> = ({
  name,
  party,
  partyVariant,
  chamber,
  state,
  district,
  currentLeadership,
}) => (
  <div>
    {/* Flex container for name and current leadership */}
    <div className="flex items-center space-x-2">
      <div className="text-md font-semibold">{name}</div>
      {currentLeadership && (
        <div className="text-xs font-mono">{currentLeadership}</div>
      )}
    </div>
    <div className="text-md font-normal">
      <Badge variant={partyVariant}>{party}</Badge>
    </div>
    <div className="text-sm font-light">{chamber}</div>
    <div className="text-sm font-light">
      {`${state} ${district ? district : ""}`}
    </div>
  </div>
);

const TermsServed: React.FC<{ terms: Term[] }> = ({ terms }) => {
  return (
    <div className="space-y-1">
      {terms.map((term) => (
        <div
          className={`block text-xs  p-1 rounded-md ${
            term.endYear
              ? "bg-slate-100 font-light"
              : "bg-slate-300 font-semibold"
          }`}
          key={`${term.chamber}-${term.congress}`} // Ensure a unique key
        >
          {`Congress ${term.congress} - ${term.chamber} from ${
            term.startYear
          } - ${term.endYear ? term.endYear : "Present"}`}
        </div>
      ))}
    </div>
  );
};

const ProfileCard: React.FC<Props> = ({ memberInfo, isLoading }) => {
  if (isLoading || !memberInfo) {
    return <ProfileCardSkeleton />;
  }

  const currentTerm = memberInfo.terms[memberInfo.terms.length - 1];
  const currentPartyHistory =
    memberInfo.partyHistory[memberInfo.partyHistory.length - 1];
  const partyVariant = getPartyVariant(currentPartyHistory?.partyName);

  const currentLeadership =
    memberInfo.leadership && memberInfo.leadership.length > 0
      ? memberInfo.leadership[memberInfo.leadership.length - 1].type
      : null;

  return (
    <Card>
      <CardContent className="pl-4">
        <div className="flex items-center justify-evenly py-4">
          <MemberImage imageUrl={memberInfo.depiction.imageUrl} />
          <MemberInfo
            name={memberInfo.directOrderName}
            party={currentPartyHistory?.partyName}
            partyVariant={partyVariant}
            chamber={currentTerm?.chamber}
            state={memberInfo.state}
            district={currentTerm?.district}
            currentLeadership={currentLeadership}
          />
        </div>
        <Separator />
        <div className=" items-center justify-evenly pt-4">
          <h3 className="scroll-m-20 text-sm font-semibold tracking-tight pb-2">
            Terms Served:
          </h3>
          <TermsServed terms={memberInfo.terms} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
