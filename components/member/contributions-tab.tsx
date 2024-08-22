import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import BillsTable from "./bills-table/page";
import { getIndustriesContributors, getOrgsContributors } from "@/lib/utils";
import OrgsTable from "./orgs-contributors-table.tsx/page";
import IndustriesTable from "./industry-contributors-table.tsx/page";

interface Props {
  organizations: CandContribResponse | null;
  industries: CandIndustriesResponse | null;
}

const ContributionsTab: React.FC<Props> = ({ organizations, industries }) => {
  const [orgsData, setOrgsData] = useState<OrgsTableDataType[]>();
  const [indsData, setIndsData] = useState<IndustryTableDataType[]>();

  useEffect(() => {
    if (organizations) {
      let orgsContributions = getOrgsContributors(organizations);

      setOrgsData(orgsContributions);
    }
  }, [organizations]);

  useEffect(() => {
    if (industries) {
      let industriesContributions = getIndustriesContributors(industries);

      setIndsData(industriesContributions);
    }
  }, [industries]);

  useEffect(() => {}, [industries]);
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
