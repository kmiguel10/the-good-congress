import { Skeleton } from "@/components/ui/skeleton";

export function ContributionsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-1 ">
        <div className="pb-5">
          <Skeleton className="h-9 w-[200px]" />
        </div>

        <Skeleton className="h-7 w-[180px]" />
        <Skeleton className="h-10 w-[360px]" />
      </div>

      <div className="rounded-md border">
        <div className="p-4 justify-center ">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-6" />
            ))}
          </div>
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="mt-4 grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, cellIndex) => (
                <Skeleton key={cellIndex} className="h-6" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
