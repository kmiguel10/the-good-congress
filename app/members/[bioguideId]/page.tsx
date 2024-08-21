"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { geCIDFromOpenSecrets } from "@/lib/utils";
import { candSummary } from "@/app/services/opensecretsService";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [openSecretsCID, setOpenSecretsCID] = useState("");
  const [candSummary, setCandSummary] = useState<SummaryAttributes>();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch(`/api/opengov/member/${bioguideId}`);
        const data: MemberInfoRoot = await response.json();

        setMemberInfo(data.member);
        console.log("Members info: ", data.member);
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
    const fetchCandidateSummary = async () => {
      try {
        let response = await fetch(
          `/api/opensecrets/candidates/${openSecretsCID}`
        );
        let data: CandSummaryObject = await response.json();
        console.log("_candSummary", data);
        setCandSummary(data.response.summary["@attributes"]);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (openSecretsCID) fetchCandidateSummary();
  }, [openSecretsCID]);

  return (
    <>
      <div>Legislators Dashboard: {}</div>
      <div>{JSON.stringify(candSummary)}</div>
    </>
  );
};

export default Page;
