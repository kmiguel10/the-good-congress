"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch(`/api/opengov/member/${bioguideId}`);
        const data: MemberInfo = await response.json();
        setMemberInfo(data);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (bioguideId) {
      fetchMemberInfo();
    }
  }, [bioguideId]);

  return (
    <>
      <div>Legislators Dashboard: {bioguideId}</div>
      <div>{JSON.stringify(memberInfo)}</div>
    </>
  );
};

export default Page;
