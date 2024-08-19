"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { CardTooltip } from "./tool-tip";

export default function CardDashboard({
  title,
  body,
  subBody,
  tooltipContent,
}: cardProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          {tooltipContent && <CardTooltip content={tooltipContent} />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{body}</div>
          <p className="text-xs text-muted-foreground">{subBody}</p>
        </CardContent>
      </Card>
    </>
  );
}
