import { Skeleton } from "@/components/ui/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Profile Card) */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-3xl p-6 h-[500px]">
              <Skeleton className="h-64 w-full rounded-2xl mb-6" />
              <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/3 mx-auto mb-6" />
              <div className="flex justify-center gap-4 mb-6">
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          {/* Right Column (Info) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border rounded-3xl p-8 h-48">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="bg-card border border-border rounded-3xl p-8 h-40">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
