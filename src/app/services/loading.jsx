import { Skeleton } from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-12 w-full rounded-full mt-8" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden h-[350px]"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="pt-4 flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
