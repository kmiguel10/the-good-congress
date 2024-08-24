import { getOrgsContributors } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useOrgsContributions = (openSecretsCID: string) => {
  const [orgsData, setOrgsData] = useState<OrgsTableDataType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const fetchCandidateContributions = async () => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `/api/opensecrets/candidates/contributors/${openSecretsCID}`
        );
        let data: CandContribObject = await response.json();
        console.log("contributions", data);
        if (data) {
          let orgsContributions = getOrgsContributors(data.response);
          setOrgsData(orgsContributions);
          setNotice(data.response.contributors["@attributes"].notice);
        }
      } catch (error) {
        console.error("Error fetching current members: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (openSecretsCID) fetchCandidateContributions();
  }, [openSecretsCID]);

  return { isLoading, orgsData, notice };
};
