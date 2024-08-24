import { getBills } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useCosponsoredBills = (
  cosponsoredLegislations: CosponsoredLegislation | undefined,
  apiKey: string
) => {
  const [coSponsoredBills, setCosponsoredBills] = useState<BillDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCosponsoredLegislations = async () => {
      try {
        const response = await fetch(
          `${cosponsoredLegislations?.url}?api_key=${apiKey}&limit=500`
        );
        const data: ColegislationsResponse = await response.json();

        if (data) {
          let tableData = getBills(data.cosponsoredLegislation);
          setCosponsoredBills(tableData);
        }
      } catch (error) {
        console.error("Error fetching cosponsored bills: ", error);
      }
    };
    if (cosponsoredLegislations) fetchCosponsoredLegislations();
  }, [cosponsoredLegislations]);

  return { coSponsoredBills, isLoading };
};
