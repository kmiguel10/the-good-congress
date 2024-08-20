import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//TODO: this is not needed anymore... so deletelater
export function getHouseOfRepresentatives(members: Member[]): Member[] {
  return members.filter((member) => {
    // Check if the terms object exists and has an item array with elements
    if (member.terms && member.terms.item && member.terms.item.length > 0) {
      // Get the last term
      const lastTermIndex = member.terms.item.length - 1;
      const lastTerm = member.terms.item[lastTermIndex];

      // Check if the chamber is "House of Representatives"
      if (lastTerm && lastTerm.chamber) {
        if (lastTerm.chamber !== "Senate") {
          console.log("Last term:", lastTerm, member);
        }

        return lastTerm.chamber !== "Senate";
      } else {
        console.warn("Chamber not found for member:", member);
      }
    } else {
      console.warn("No terms found for member:", member);
    }
    return false; // If no terms or chamber, assume not in the House
  });
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

  if (!stateCode) {
    console.error("State code is not available");
    return null; // or throw an error if you want to handle it differently
  }

  try {
    const response = await fetch(`/api/opensecrets/member/${stateCode}`);
    const data: LegislatorsObject = await response.json();
    //filter out member
    let cid = getMemberCID(memberName, data.response.legislator);

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
  let member: Legislator[] = memberList.filter(
    (member) => member["@attributes"].lastname === memberName
  );
  console.log("MEMBER", member[0]);
  return member[0]["@attributes"].cid;
}
