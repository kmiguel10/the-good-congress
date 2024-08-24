import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

export function FinancialSummarySkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4 p-4">
          <div className="flex flex-col items-start justify-between gap-1 ">
            <Skeleton className="h-7 w-[180px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>

          <div className="rounded-md border">
            <div className="p-4 justify-center ">
              <div className="grid grid-cols-3 gap-4 items-center">
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-1 ">
            <Skeleton className="h-5 w-[180px]" />
            <Skeleton className="h-5 w-[180px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
