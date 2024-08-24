import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Filter members to turn into the data table members shape
export function getCongressTableMembers(members: Member[]) {
  let congressMembers: CongressMemberTable[] = [];

  members.map((member) => {
    const lastTermIndex = member.terms.item.length - 1;
    const lastTerm =
      member.terms.item[lastTermIndex].chamber === "Senate"
        ? "Senate"
        : "House";
    let _member: CongressMemberTable = {
      bioguideId: member.bioguideId,
      name: member.name,
      chamber: lastTerm,
      party: member.partyName,
      state: member.state,
      district: member.district ? member.district : null,
    };

    congressMembers.push(_member);
  });

  return congressMembers;
}

//Returns the candidate id of a given member
export async function geCIDFromOpenSecrets(memberInfo: MemberInfo) {
  let stateCode = getStateCodeFromMemberInfo(memberInfo);
  let memberName = memberInfo.lastName;

  console.log("Statecode", stateCode);

  if (!stateCode) {
    console.error("State code is not available");
    return null; // or throw an error if you want to handle it differently
  }

  try {
    const response = await fetch(`/api/opensecrets/member/${stateCode}`);
    const data: LegislatorsObject = await response.json();
    console.log("data: ", data);
    //filter out member
    let cid = getMemberCID(memberName, data.response?.legislator);

    return cid;
  } catch (error) {
    console.error("Error fetching current members in opensecret: ", error);
  }
}

//Helper to get the stateCode from membersInfo
function getStateCodeFromMemberInfo(memberInfo: MemberInfo) {
  if (!memberInfo || !memberInfo.terms || memberInfo.terms.length === 0) {
    // Return null or a default value if memberInfo or terms are undefined or empty
    return null;
  }
  let lastTerm = memberInfo.terms.length - 1;
  let currentTerm = memberInfo.terms[lastTerm];
  return currentTerm.stateCode;
}

//Returns the current member's CID
function getMemberCID(memberName: string, memberList: Legislator[]) {
  let member: Legislator[] = memberList.filter((member) =>
    memberName
      .toLowerCase()
      .includes(member["@attributes"].lastname.toLowerCase())
  );

  let cid = member[0]["@attributes"].cid;

  return cid;
}

//Returns sponsored and cosponsored bills in Bills shape
export function getBills(bills: SponsoredLegislationDataType[] | undefined) {
  if (!Array.isArray(bills)) {
    console.log("Expected an array of bills but received:", bills);
    return [];
  }

  let _bills: BillDataType[] = [];

  bills.map((bill) => {
    let _bill: BillDataType = {
      billNumber: "number" in bill ? parseInt(bill.number) : 0, // Default to 0 if not present
      amendmentNumber: "amendmentNumber" in bill ? bill.amendmentNumber : "", // Default to empty string if not present
      title: "title" in bill ? bill.title : "", // Default to empty string if not present
      introducedDate: new Date(bill.introducedDate),
      latestAction: bill.latestAction ? bill.latestAction.text : "",
    };
    _bills.push(_bill);
  });

  return _bills;
}

export function formatDate(dateString: string): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Extract month, day, and year
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  // Return the formatted date string
  return `${month}/${day}/${year}`;
}

//Gets data for Contributors Table
export function getOrgsContributors(
  orgs: CandContribResponse
): OrgsTableDataType[] {
  console.log("getOrgsContributors - orgs object:", orgs);

  let _orgs: OrgsTableDataType[] = [];

  // Check if orgs.contributors.contributor exists and is an array
  if (orgs.contributors && Array.isArray(orgs.contributors.contributor)) {
    orgs.contributors.contributor.forEach((org) => {
      let orgTableData: OrgsTableDataType = {
        orgName: org["@attributes"].org_name,
        indiv: org["@attributes"].indivs,
        pacs: org["@attributes"].pacs,
        total: org["@attributes"].total,
      };

      _orgs.push(orgTableData);
    });
  } else {
    console.error("orgs.contributors.contributor is undefined or not an array");
  }

  return _orgs;
}

export function getIndustriesContributors(
  industries: CandIndustriesResponse
): IndustryTableDataType[] {
  console.log("getIndustriesContributors - orgs object:", industries);

  let _inds: IndustryTableDataType[] = [];

  // Check if orgs.contributors.contributor exists and is an array
  if (industries.industries && Array.isArray(industries.industries.industry)) {
    industries.industries.industry.forEach((industry) => {
      let indTableData: IndustryTableDataType = {
        industry_name: industry["@attributes"].industry_name,
        indiv: industry["@attributes"].indivs,
        pacs: industry["@attributes"].pacs,
        total: industry["@attributes"].total,
      };

      _inds.push(indTableData);
    });
  } else {
    console.error("orgs.contributors.contributor is undefined or not an array");
  }

  return _inds;
}

// In @/lib/utils.js or utils.ts
export const formatDollar = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
