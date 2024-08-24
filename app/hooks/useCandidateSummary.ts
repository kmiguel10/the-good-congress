import { useState, useEffect } from "react";

export const useCandidateSummary = (openSecretsCID: string) => {
  const [candSummary, setCandSummary] = useState<SummaryAttributes>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("CID: ", openSecretsCID);
    const fetchCandidateSummary = async () => {
      try {
        setIsLoading(true);
        let response = await fetch(
          `/api/opensecrets/candidates/${openSecretsCID}`
        );
        let data: CandSummaryObject = await response.json();
        console.log(
          "Open secrets summary: ",
          data.response.summary["@attributes"]
        );
        setCandSummary(data.response.summary["@attributes"]);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (openSecretsCID) fetchCandidateSummary();
  }, [openSecretsCID]);
  return { candSummary, isLoading };
};
