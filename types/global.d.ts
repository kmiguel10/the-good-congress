interface Session {
  chamber: string;
  endDate?: string; // Optional because some sessions do not have an endDate
  number: number;
  startDate: string;
  type: string;
}

interface Congress {
  endYear: string;
  name: string;
  number: number;
  sessions: Session[];
  startYear: string;
  updateDate: string;
  url: string;
}

interface Request {
  contentType: string;
  format: string;
}

interface CongressResponse {
  congress: Congress;
  request: Request;
}

// From getting current members
interface Term {
  chamber: string;
  startYear: number;
  // Add other properties as needed
}

interface Depiction {
  attribution: string;
  imageUrl: string;
}

interface Member {
  bioguideId: string;
  depiction: Depiction;
  district?: number;
  name: string;
  partyName: string;
  state: string;
  terms: {
    item: Term[];
  };
  updateDate: string;
  url: string;
}

/**
 * Prop interface for CardDashboard
 */
interface cardProps {
  title: string;
  body: string | null;
  subBody: string;
  tooltipContent?: string | null;
}

//Shape of members table data
interface CongressMemberTable {
  bioguideId: string;
  name: string;
  chamber: string;
  party: string;
  state: string;
  district: number | null;
}

/**
 * Shape of object received from /members/[bioguideId]
 * which is member information
 */

interface Legislation {
  count: number;
  url: string;
}

interface Depiction {
  attribution: string;
  imageUrl: string;
}

interface Leadership {
  congress: number;
  type: string;
}

interface PartyHistory {
  partyAbbreviation: string;
  partyName: string;
  startYear: number;
}

interface Term {
  chamber: string;
  congress: number;
  endYear: number;
  memberType: string;
  startYear: number;
  stateCode: string;
  stateName: string;
}

interface MemberInfo {
  bioguideId: string;
  birthYear: string;
  cosponsoredLegislation: Legislation;
  currentMember: boolean;
  depiction: Depiction;
  directOrderName: string;
  firstName: string;
  honorificName: string;
  invertedOrderName: string;
  lastName: string;
  leadership: Leadership[];
  partyHistory: PartyHistory[];
  sponsoredLegislation: Legislation;
  state: string;
  terms: Term[];
  updateDate: string;
}
