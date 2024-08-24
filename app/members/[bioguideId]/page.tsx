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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { bioguideId } = useParams(); // Extract bioguideId from the URL
  const { isLoading: isLoadingMemberInfo, memberInfo } = useMemberInfo(
    bioguideId.toString()
  );
  const { isLoading: isLoadingOpenSecretsId, openSecretsCID } =
    useCIDFromOpenSecrets(memberInfo);
  const router = useRouter();
  return (
    <>
      <div className="container relative">
        <section className="md:block">
          <div className="overflow-hidden rounded-lg bg-background space-y-1">
            <div className="flex-1 space-y-2 p-2 pt-2">
              <Button variant={"secondary"} onClick={() => router.push("/")}>
                Home
              </Button>
            </div>
            <div className="flex-1 space-y-2 p-2 pt-2">
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
