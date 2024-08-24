"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBills } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import BillsTable from "./bills-table/page";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSponsoredBills } from "@/app/hooks/useSponsoredBills";
import { TableSkeleton } from "../global/table-skeleton";
import { useCosponsoredBills } from "@/app/hooks/useCosponsoredBills";

interface Props {
  sponsoredLegislations?: SponsoredLegislation;
  cosponsoredLegislations?: CosponsoredLegislation;
}

const BillsTab: React.FC<Props> = ({
  sponsoredLegislations,
  cosponsoredLegislations,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_OPEN_CONGRESS_GOV_API_KEY || "";

  const { sponsoredBills, isLoading: isLoadingSponsoredBills } =
    useSponsoredBills(sponsoredLegislations, apiKey);
  const { coSponsoredBills, isLoading: isLoadingCosponsoredBills } =
    useCosponsoredBills(cosponsoredLegislations, apiKey);

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

        <ScrollArea className="h-96 w-auto rounded-md border-0">
          <BillsTable
            bills={sponsoredBills}
            isLoading={isLoadingSponsoredBills}
          />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="cosponsored" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-md font-semibold px-2">
            Bills: {cosponsoredLegislations?.count}
          </div>
        </div>
        <ScrollArea className="h-96 w-auto rounded-md border">
          <BillsTable
            bills={coSponsoredBills}
            isLoading={isLoadingCosponsoredBills}
          />
        </ScrollArea>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 "></div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 "></div>
      </TabsContent>
    </Tabs>
  );
};

export default BillsTab;
