import { getIndustriesContributors } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useIndustryContributions = (openSecretsCID: string) => {
  const [indsData, setIndsData] = useState<IndustryTableDataType[]>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIndustryContributions = async () => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `/api/opensecrets/candidates/industry/${openSecretsCID}`
        );
        let data: CandContribObject = await response.json();
        console.log("industry", data);
        if (data) {
          let industriesContributions = getIndustriesContributors(
            data.response
          );

          setIndsData(industriesContributions);
        }
      } catch (error) {
        console.error("Error fetching current members: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (openSecretsCID) fetchIndustryContributions();
  }, [openSecretsCID]);

  return { isLoading, indsData };
};
