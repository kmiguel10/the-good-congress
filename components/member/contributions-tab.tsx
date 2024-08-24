import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIndustriesContributors, getOrgsContributors } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import IndustriesTable from "./industry-contributors-table.tsx/page";
import OrgsTable from "./orgs-contributors-table.tsx/page";
import NoticeTooltip from "./notice-tooltip";
import { useOrgsContributions } from "@/app/hooks/useOrgsContribution";
import { useIndustryContributions } from "@/app/hooks/useIndustryContributions";
import { ContributionsTableSkeleton } from "../global/contributions-table-skeleton";

interface Props {
  openSecretsCID: string;
}

const ContributionsTab: React.FC<Props> = ({ openSecretsCID }) => {
  const {
    isLoading: isOrgsLoading,
    orgsData,
    notice,
  } = useOrgsContributions(openSecretsCID);

  const { isLoading: isIndsLoading, indsData } =
    useIndustryContributions(openSecretsCID);

  if (isIndsLoading || isOrgsLoading) {
    return <ContributionsTableSkeleton />;
  }

  return (
    <Tabs defaultValue="organizations" className="space-y-4">
      <TabsList>
        <TabsTrigger value="organizations">Organizations</TabsTrigger>
        <TabsTrigger value="industries">Industries</TabsTrigger>
      </TabsList>
      <TabsContent value="organizations" className="space-y-4">
        <div>
          <div className="flex items-center">
            <div className="text-md font-semibold p-2">
              Top Contributors by Organization
            </div>
            <NoticeTooltip notice={notice} />
          </div>
          <div className="flex justify-start px-2">
            <div className="w-3/4 bg-yellow-200 rounded-md py-1">
              <p className="text-xs font-light px-2 ">
                * 6-year numbers for senators/Senate candidates
              </p>
              <p className="text-xs font-light px-2">
                * 2-year numbers for representatives/House candidates
              </p>
            </div>
          </div>
        </div>
        {orgsData && <OrgsTable organizations={orgsData} />}
      </TabsContent>
      <TabsContent value="industries" className="space-y-4">
        <div className="">
          <div className="text-md font-semibold p-2">
            Top Contributors by Industry
          </div>
          <div className="flex justify-start px-2">
            <div className="w-3/4 bg-yellow-200 rounded-md py-1">
              <p className="text-xs font-light px-2 ">
                * 6-year numbers for senators/Senate candidates
              </p>
              <p className="text-xs font-light px-2">
                * 2-year numbers for representatives/House candidates
              </p>
            </div>
          </div>
        </div>
        {indsData && <IndustriesTable industries={indsData} />}
      </TabsContent>
    </Tabs>
  );
};

export default ContributionsTab;
