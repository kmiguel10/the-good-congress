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
