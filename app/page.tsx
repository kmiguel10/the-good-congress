"use client";

import { CongressDashboard } from "@/components/congress/congress-dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentCongress, setCurrentCongress] = useState("");
  const [members, setMembers] = useState<Member[]>();
  useEffect(() => {
    const fetchCurrentCongress = async () => {
      try {
        const response = await fetch("/api/opengov/congress/current");
        const data: CongressResponse = await response.json();

        let currentCongress = data.congress.number.toString();
        console.log("Current congress: ", currentCongress);
        setCurrentCongress(currentCongress);
      } catch (error) {
        console.error("Error fetching current congress: ", error);
      }
    };

    fetchCurrentCongress();
  }, []);

  useEffect(() => {
    const fetchCurrentMembers = async () => {
      try {
        const response = await fetch(
          `/api/opengov/member/congress/${currentCongress}`
        );
        const data: Member[] = await response.json();
        console.log("Current members: ", data);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };

    if (currentCongress) {
      fetchCurrentMembers();
    }
  }, [currentCongress]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CongressDashboard />
      <div>{JSON.stringify(members)}</div>
    </div>
  );
}
