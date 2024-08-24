import { getBills } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSponsoredBills = (
  sponsoredLegislations: SponsoredLegislation | undefined,
  apiKey: string
) => {
  const [sponsoredBills, setSponsoredBills] = useState<BillDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSponsoredBills = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${sponsoredLegislations?.url}?api_key=${apiKey}&limit=200&format=json`
        );
        const data: LegislationsResponse = await response.json();

        if (data) {
          let tableData = getBills(data.sponsoredLegislation);
          setSponsoredBills(tableData);
        }
      } catch (error) {
        console.error("Error fetching sponsored legislations: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (sponsoredLegislations) fetchSponsoredBills();
  }, [sponsoredLegislations]);

  return { sponsoredBills, isLoading };
};
