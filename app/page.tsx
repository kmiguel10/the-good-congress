"use client";

import { CongressDashboard } from "@/components/congress/congress-dashboard";
import CardDashboard from "@/components/global/card-dashboard";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [currentCongress, setCurrentCongress] = useState("");
  const [members, setMembers] = useState<Member[]>();

  //Fetch the current congress i.e. 118th congress
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

  //Fetch the current members of this congress
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

  //use useMemo to cache membersData
  const cachedMembers = useMemo(() => members, [members]);

  return (
    <div className="container relative">
      <section className="md:block">
        <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
          <CongressDashboard members={cachedMembers} />
        </div>
      </section>
    </div>
  );
}
