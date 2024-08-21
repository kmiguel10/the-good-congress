"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { geCIDFromOpenSecrets } from "@/lib/utils";
import { candSummary } from "@/app/services/opensecretsService";
import Image from "next/image";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [openSecretsCID, setOpenSecretsCID] = useState("");
  const [candSummary, setCandSummary] = useState<SummaryAttributes>();
  const [candContributions, setCandContributions] = useState<Contributors>();
  const [candIndustries, setCandIndustries] = useState<Industries>();

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

  //Fetch candidate contributions by individuals
  useEffect(() => {
    const fetchCandidateContributions = async () => {
      try {
        let response = await fetch(
          `/api/opensecrets/candidates/contributors/${openSecretsCID}`
        );
        let data: CandContribObject = await response.json();

        if (data) setCandContributions(data.response);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (openSecretsCID) fetchCandidateContributions();
  }, [openSecretsCID]);

  //Fetch candidate contributions by industry
  useEffect(() => {
    const fetchIndustryContributions = async () => {
      try {
        let response = await fetch(
          `/api/opensecrets/candidates/industry/${openSecretsCID}`
        );
        let data: CandContribObject = await response.json();
        console.log("industry", data);
        if (data) setCandIndustries(data.response);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (openSecretsCID) fetchIndustryContributions();
  }, [openSecretsCID]);

  return (
    <>
      <div>Legislators Dashboard: {}</div>
      {/* {
        <div>
          {memberInfo?.depiction.imageUrl ? (
            <Image
              src={memberInfo?.depiction?.imageUrl || "/default-image.jpg"}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      } */}
      <div>
        {memberInfo?.depiction.imageUrl && (
          <img
            src={memberInfo?.depiction?.imageUrl || "/default-image.jpg"}
            alt="Picture of the author"
            width={150}
            height={150}
          />
        )}
      </div>

      <div>{JSON.stringify(memberInfo)}</div>
      <div>{JSON.stringify(candSummary)}</div>
      <div>{JSON.stringify(candContributions)}</div>
      <div>{JSON.stringify(candIndustries)}</div>
    </>
  );
};

export default Page;
