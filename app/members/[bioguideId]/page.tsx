"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { geCIDFromOpenSecrets } from "@/lib/utils";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();

  const [openSecretsCID, setOpenSecretsCID] = useState("");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch(`/api/opengov/member/${bioguideId}`);
        const data: MemberInfoRoot = await response.json();

        setMemberInfo(data.member);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (bioguideId) {
      fetchMemberInfo();
    }
  }, [bioguideId]);

  //get cid from open secrets
  useEffect(() => {
    if (memberInfo) {
      console.log("memberInfo", memberInfo.terms);
      const getCid = async () => {
        try {
          let cid = await geCIDFromOpenSecrets(memberInfo);
          if (cid) {
            setOpenSecretsCID(cid);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      getCid();
    }
  }, [memberInfo]);

  //get data from open secrets
  useEffect(() => {
    console.log("CID: ", openSecretsCID);
  }, [openSecretsCID]);

  return (
    <>
      <div>Legislators Dashboard: {}</div>
      <div>{JSON.stringify(openSecretsCID)}</div>
    </>
  );
};

export default Page;
