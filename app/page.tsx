"use client";

import { CongressDashboard } from "@/components/congress/congress-dashboard";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchCurrentCongress = async () => {
      try {
        const response = await fetch("/api/opengov/congress/current");
        const data = await response.json();
        console.log("Current congress: ", data);
      } catch (error) {
        console.error("Error fetching current congress: ", error);
      }
    };

    fetchCurrentCongress();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CongressDashboard />
    </div>
  );
}
