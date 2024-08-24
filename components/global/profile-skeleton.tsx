import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <Card>
      <CardContent className="pl-4">
        <div className="flex items-center justify-evenly pt-4">
          <div className="py-2">
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
