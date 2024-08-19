import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
