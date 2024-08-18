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
type Term = {
  chamber: string;
  startYear: number;
  endYear?: number;
};

type Depiction = {
  attribution: string;
  imageUrl: string;
};

type Member = {
  bioguideId: string;
  depiction: Depiction;
  district?: number;
  name: string;
  partyName: string;
  state: string;
  terms: Term[];
  updateDate: string;
  url: string;
};
