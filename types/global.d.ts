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

interface Term {
  chamber: string;
  congress: number;
  district?: number; // Optional, as it is not present for Senate terms
  endYear?: number; // Optional, as it is not present for the current term
  memberType: string;
  startYear: number;
  stateCode: string;
  stateName: string;
}

interface AddressInformation {
  city: string;
  district: string;
  officeAddress: string;
  phoneNumber: string;
  zipCode: number;
}

interface CosponsoredLegislation {
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
  current?: boolean; // Optional, as it only appears in one instance
}

interface PartyHistory {
  partyAbbreviation: string;
  partyName: string;
  startYear: number;
}

interface SponsoredLegislation {
  count: number;
  url: string;
}

interface MemberInfo {
  addressInformation: AddressInformation;
  bioguideId: string;
  birthYear: string;
  cosponsoredLegislation: CosponsoredLegislation;
  currentMember: boolean;
  depiction: Depiction;
  directOrderName: string;
  firstName: string;
  honorificName?: string; // Optional, as it might not be present in all cases
  invertedOrderName: string;
  lastName: string;
  leadership: Leadership[];
  middleName?: string; // Optional, as it might not be present in all cases
  nickName?: string; // Optional, as it might not be present in all cases
  officialWebsiteUrl: string;
  partyHistory: PartyHistory[];
  sponsoredLegislation: SponsoredLegislation;
  state: string;
  terms: Term[];
  updateDate: string;
}

interface Request {
  bioguideId: string;
  contentType: string;
  format: string;
}

interface MemberInfoRoot {
  member: MemberIndividual;
  request: Request;
}

// Object return for getLegislator from opensecrets
interface LegislatorAttributes {
  cid: string;
  firstlast: string;
  lastname: string;
  party: string;
  office: string;
  gender: string;
  first_elected: string;
  exit_code: string;
  comments: string;
  phone: string;
  fax: string;
  website: string;
  webform: string;
  congress_office: string;
  bioguide_id: string;
  votesmart_id: string;
  feccandid: string;
  twitter_id: string;
  youtube_url: string;
  facebook_id: string;
  birthdate: string;
}

interface Legislator {
  "@attributes": LegislatorAttributes;
}

interface Response {
  legislator: Legislator[];
}

interface LegislatorsObject {
  response: Response;
}

//Response object from candSummary
interface SummaryAttributes {
  cand_name: string;
  cid: string;
  cycle: string;
  state: string;
  party: string;
  chamber: string;
  first_elected: string;
  next_election: string;
  total: string;
  spent: string;
  cash_on_hand: string;
  debt: string;
  origin: string;
  source: string;
  last_updated: string;
}

interface Summary {
  "@attributes": SummaryAttributes;
}

interface CandSummaryResponse {
  summary: Summary;
}

interface CandSummaryObject {
  response: CandSummaryResponse;
}

//Object for candContrib api call
interface ContributorAttributes {
  org_name: string;
  total: string;
  pacs: string;
  indivs: string;
}

interface Contributor {
  "@attributes": ContributorAttributes;
}

interface ContributorsAttributes {
  cand_name: string;
  cid: string;
  cycle: string;
  origin: string;
  source: string;
  notice: string;
}

interface Contributors {
  "@attributes": ContributorsAttributes;
  contributor: Contributor[];
}

interface CandContribResponse {
  contributors: Contributors;
}

interface CandContribObject {
  response: CandidateContributionResponse;
}
