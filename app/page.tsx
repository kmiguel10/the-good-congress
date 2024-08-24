"use client";

import { CongressDashboard } from "@/components/congress/congress-dashboard";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [currentCongress, setCurrentCongress] = useState("");

  //Fetch the current congress i.e. 118th congress
  useEffect(() => {
    const fetchCurrentCongress = async () => {
      try {
        const response = await fetch("/api/opengov/congress/current");
        const data: CongressResponse = await response.json();

        let currentCongress = data.congress.number.toString();

        setCurrentCongress(currentCongress);
      } catch (error) {
        console.error("Error fetching current congress: ", error);
      }
    };

    fetchCurrentCongress();
  }, []);

  return (
    <div className="container relative">
      <section className="md:block">
        <div className="overflow-hidden rounded-lg  bg-background  space-y-4">
          <CongressDashboard currentCongress={currentCongress} />
        </div>
      </section>
    </div>
  );
}
