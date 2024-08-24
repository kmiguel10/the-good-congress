"use client";

import { useCIDFromOpenSecrets } from "@/app/hooks/useCIDFromOpenSecrets";
import { useMemberInfo } from "@/app/hooks/useMemberInfo";
import { FinancialSummarySkeleton } from "@/components/global/financial-summary-skeleton";
import BillsTab from "@/components/member/bills-tab";
import ContributionsTab from "@/components/member/contributions-tab";
import FinancialSummary from "@/components/member/financial-summary";
import ProfileCard from "@/components/member/profile-card";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const { isLoading: isLoadingMemberInfo, memberInfo } = useMemberInfo(
    bioguideId.toString()
  );
  const { isLoading: isLoadingOpenSecretsId, openSecretsCID } =
    useCIDFromOpenSecrets(memberInfo);

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
                    <ProfileCard memberInfo={memberInfo} isLoading={false} />
                  </div>

                  <div>
                    <Card className="col-span-4 py-2">
                      <CardContent className="pl-2">
                        {
                          <BillsTab
                            sponsoredLegislations={
                              memberInfo?.sponsoredLegislation
                            }
                            cosponsoredLegislations={
                              memberInfo?.cosponsoredLegislation
                            }
                          />
                        }
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="col-span-4 ">
                  <FinancialSummary openSecretsCID={openSecretsCID} />
                  <div className="py-2">
                    <Card className="col-span-4 py-2">
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
