import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-[300px]" />
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-6" />
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="mt-4 grid grid-cols-5 gap-4">
              {[...Array(10)].map((_, cellIndex) => (
                <Skeleton key={cellIndex} className="h-6" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-9 w-[80px]" />
        <Skeleton className="h-9 w-[80px]" />
      </div>
    </div>
  );
}
