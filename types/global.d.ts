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
  name: string;
  chamber: string;
  party: string;
  state: string;
  district: number | null;
}
