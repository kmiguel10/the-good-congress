import { geCIDFromOpenSecrets } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useCIDFromOpenSecrets = (memberInfo: MemberInfo | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openSecretsCID, setOpenSecretsCID] = useState("");

  useEffect(() => {
    if (memberInfo) {
      const getCid = async () => {
        try {
          setIsLoading(true);
          let cid = await geCIDFromOpenSecrets(memberInfo);
          if (cid) {
            setOpenSecretsCID(cid);
          }
          setIsLoading(false);
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      getCid();
    }
  }, [memberInfo]);

  return { openSecretsCID, isLoading };
};
