"use client";

import CongressTable from "@/components/congress/members-table/page";
import BillsTab from "@/components/member/bills-tab";
import ContributionsTab from "@/components/member/contributions-tab";
import ProfileCard from "@/components/member/profile-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { geCIDFromOpenSecrets } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [openSecretsCID, setOpenSecretsCID] = useState("");
  const [candSummary, setCandSummary] = useState<SummaryAttributes>();
  const [candContributions, setCandContributions] =
    useState<CandContribResponse>();
  const [candIndustries, setCandIndustries] =
    useState<CandIndustriesResponse>();

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
        console.log("contributions", data);
        if (data) {
          setCandContributions(data.response);
        }
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
      {/* <div>{JSON.stringify(memberInfo)}</div>
      <div>{JSON.stringify(candSummary)}</div>
      <div>{JSON.stringify(candContributions)}</div>
      <div>{JSON.stringify(candIndustries)}</div> */}

      <div className="container relative">
        <section className="md:block">
          <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="col-span-4">
                  <div className="col-span-2 p-2">
                    <ProfileCard memberInfo={memberInfo} />
                  </div>

                  <div>
                    <Card className="col-span-4 py-2">
                      {/* <CardHeader>
                        <CardTitle>Bills</CardTitle>
                      </CardHeader> */}
                      <CardContent className="pl-2">
                        {memberInfo?.sponsoredLegislation &&
                          memberInfo?.cosponsoredLegislation && (
                            <BillsTab
                              sponsoredLegislations={
                                memberInfo?.sponsoredLegislation
                              }
                              cosponsoredLegislations={
                                memberInfo?.cosponsoredLegislation
                              }
                            />
                          )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="col-span-4">
                  <Card className="col-span-4 py-2">
                    {/* <CardHeader>
                        <CardTitle>Bills</CardTitle>
                      </CardHeader> */}
                    <CardContent className="pl-2">
                      {candContributions && candIndustries && (
                        <ContributionsTab
                          organizations={candContributions}
                          industries={candIndustries}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
