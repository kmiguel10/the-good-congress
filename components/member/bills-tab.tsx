"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBills } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import BillsTable from "./bills-table/page";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  sponsoredLegislations: SponsoredLegislation | null;
  cosponsoredLegislations: CosponsoredLegislation | null;
}

const BillsTab: React.FC<Props> = ({
  sponsoredLegislations,
  cosponsoredLegislations,
}) => {
  const [sponsoredBills, setSponsoredBills] = useState<BillDataType[]>();
  const [coSponsoredBills, setCosponsoredBills] = useState<BillDataType[]>();

  const apiKey = process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY;

  useEffect(() => {
    const fetchSponsoredBills = async () => {
      try {
        const response = await fetch(
          `${sponsoredLegislations?.url}?api_key=${apiKey}&limit=500&format=json`
        );
        const data: LegislationsResponse = await response.json();

        if (data) {
          let tableData = getBills(data.sponsoredLegislation);
          setSponsoredBills(tableData);
        }
      } catch (error) {
        console.error("Error fetching sponsored legislations: ", error);
      }
    };
    if (sponsoredLegislations) fetchSponsoredBills();
  }, [sponsoredLegislations]);

  useEffect(() => {
    const fetchCosponsoredLegislations = async () => {
      try {
        const response = await fetch(
          `${cosponsoredLegislations?.url}?api_key=${apiKey}&limit=500`
        );
        const data: ColegislationsResponse = await response.json();

        if (data) {
          let tableData = getBills(data.cosponsoredLegislation);
          setCosponsoredBills(tableData);
        }
      } catch (error) {
        console.error("Error fetching cosponsored bills: ", error);
      }
    };
    if (cosponsoredLegislations) fetchCosponsoredLegislations();
  }, [cosponsoredLegislations]);
  return (
    <Tabs defaultValue="sponsored" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
        <TabsTrigger value="cosponsored">Cosponsored</TabsTrigger>
      </TabsList>
      <TabsContent value="sponsored" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-md font-semibold px-2">
            Bills: {sponsoredLegislations?.count}
          </div>
        </div>
        {sponsoredBills && (
          <ScrollArea className="h-96 w-auto rounded-md border-0">
            <BillsTable bills={sponsoredBills} />
          </ScrollArea>
        )}
      </TabsContent>
      <TabsContent value="cosponsored" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-md font-semibold px-2">
            Bills: {cosponsoredLegislations?.count}
          </div>
        </div>
        <ScrollArea className="h-96 w-auto rounded-md border">
          {coSponsoredBills && <BillsTable bills={coSponsoredBills} />}
        </ScrollArea>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 "></div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 "></div>
      </TabsContent>
    </Tabs>
  );
};

export default BillsTab;
