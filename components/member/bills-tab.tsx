import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const BillsTab = () => {
  return (
    <Tabs defaultValue="sponsored" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
        <TabsTrigger value="cosponsored">Cosponsored</TabsTrigger>
        {/* <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
      </TabsList>
      <TabsContent value="sponsored" className="space-y-4"></TabsContent>
      <TabsContent value="cosponsored" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 "></div>
        {/**TODO: will need to fix the layout of the bar chart */}
        {/**TODO: Create separate components for Card... */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 "></div>
      </TabsContent>
    </Tabs>
  );
};

export default BillsTab;
