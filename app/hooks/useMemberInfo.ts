import { useEffect, useState } from "react";

export const useMemberInfo = (bioguideId: string) => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [isLoading, setIsLoading] = useState(false);
  bioguideId;
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/opengov/member/${bioguideId}`);
        const data: MemberInfoRoot = await response.json();

        console.log("Member summary: ", data);
        setMemberInfo(data.member);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (bioguideId) {
      fetchMemberInfo();
    }
  }, [bioguideId]);

  return { memberInfo, isLoading };
};
