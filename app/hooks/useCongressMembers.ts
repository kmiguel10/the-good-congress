import { getCongressTableMembers } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useCongressMembers = (currentCongress: string) => {
  const [congressTableData, setCongressTableData] =
    useState<CongressMemberTable[]>();

  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchCurrentMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/opengov/member/congress/${currentCongress}`
        );
        const data: Member[] = await response.json();

        const filteredMembers = getCongressTableMembers(data);
        console.log("Filtered members: ", filteredMembers);
        setCongressTableData(filteredMembers);

        setIsLoading(false);
        setIsDataReady(true); // Set this to true when data is ready
      } catch (error) {
        console.error("Error fetching current members: ", error);
      } finally {
        setIsLoading(false);
        setIsDataReady(true); // Set this to true even on error, so we can show an error state if needed
      }
    };

    if (currentCongress) {
      fetchCurrentMembers();
    }
  }, [currentCongress]);

  return { congressTableData, isLoading, isDataReady };
};
