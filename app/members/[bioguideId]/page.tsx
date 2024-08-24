"use client";

import BillsTab from "@/components/member/bills-tab";
import ContributionsTab from "@/components/member/contributions-tab";
import FinancialSummary from "@/components/member/financial-summary";
import ProfileCard from "@/components/member/profile-card";
import { Card, CardContent } from "@/components/ui/card";
import { geCIDFromOpenSecrets } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [openSecretsCID, setOpenSecretsCID] = useState("");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch(`/api/opengov/member/${bioguideId}`);
        const data: MemberInfoRoot = await response.json();

        console.log("Member summary: ", data);
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

  return (
    <>
      <div className="container relative">
        <section className="md:block">
          <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
            <div>
              <button>Back</button>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="col-span-4">
                  <div className="col-span-2 pb-2">
                    <ProfileCard memberInfo={memberInfo} />
                  </div>

                  <div>
                    <Card className="col-span-4 py-2">
                      {/* <CardHeader>
                        <CardTitle>Bills</CardTitle>
                      </CardHeader> */}
                      <CardContent className="pl-2">
                        {memberInfo && (
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
                <div className="col-span-4 ">
                  <FinancialSummary openSecretsCID={openSecretsCID} />
                  <div className="py-2">
                    <Card className="col-span-4 py-2">
                      {/* <CardHeader>
                        <CardTitle>Bills</CardTitle>
                      </CardHeader> */}
                      <CardContent className="pl-2">
                        <ContributionsTab openSecretsCID={openSecretsCID} />
                      </CardContent>
                    </Card>
                  </div>
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
