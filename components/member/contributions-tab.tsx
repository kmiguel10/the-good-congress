import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIndustriesContributors, getOrgsContributors } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import IndustriesTable from "./industry-contributors-table.tsx/page";
import OrgsTable from "./orgs-contributors-table.tsx/page";

interface Props {
  openSecretsCID: string;
}

const ContributionsTab: React.FC<Props> = ({ openSecretsCID }) => {
  const [orgsData, setOrgsData] = useState<OrgsTableDataType[]>();
  const [indsData, setIndsData] = useState<IndustryTableDataType[]>();

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
          let orgsContributions = getOrgsContributors(data.response);
          setOrgsData(orgsContributions);
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
        if (data) {
          let industriesContributions = getIndustriesContributors(
            data.response
          );

          setIndsData(industriesContributions);
        }
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (openSecretsCID) fetchIndustryContributions();
  }, [openSecretsCID]);

  return (
    <Tabs defaultValue="organizations" className="space-y-4">
      <TabsList>
        <TabsTrigger value="organizations">Organizations</TabsTrigger>
        <TabsTrigger value="industries">Industries</TabsTrigger>
      </TabsList>
      <TabsContent value="organizations" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-md font-semibold px-2"></div>
        </div>

        {orgsData && <OrgsTable organizations={orgsData} />}
      </TabsContent>
      <TabsContent value="industries" className="space-y-4">
        {/* <ScrollArea className="h-96 w-auto rounded-md border"></ScrollArea>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 "></div> */}
        {indsData && <IndustriesTable industries={indsData} />}
      </TabsContent>
    </Tabs>
  );
};

export default ContributionsTab;
