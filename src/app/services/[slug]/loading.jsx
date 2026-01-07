// components/ServiceDetailsSkeleton.js
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ServiceDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20 animate-pulse">
      {/* HERO BANNER SKELETON */}
      <div className="relative h-64 md:h-80 w-full bg-stone-200 dark:bg-stone-800 rounded-md" />

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN SKELETON */}
          <div className="lg:col-span-7 space-y-10">
            {/* About Section */}
            <section>
              <div className="h-6 w-40 bg-stone-300 dark:bg-stone-700 rounded-md mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-stone-300 dark:bg-stone-700 rounded-md"></div>
                <div className="h-4 w-full bg-stone-300 dark:bg-stone-700 rounded-md"></div>
                <div className="h-4 w-5/6 bg-stone-300 dark:bg-stone-700 rounded-md"></div>
              </div>
            </section>

            {/* Features Section */}
            <section>
              <div className="h-6 w-48 bg-stone-300 dark:bg-stone-700 rounded-md mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-stone-200 dark:bg-stone-800 border border-border"
                  >
                    <CheckCircle2 className="h-5 w-5 text-transparent shrink-0 mt-0.5" />
                    <div className="h-4 w-full bg-stone-300 dark:bg-stone-700 rounded-md" />
                  </div>
                ))}
              </div>
            </section>

            {/* Safety Notice Skeleton */}
            <section className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-transparent shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-blue-200 dark:bg-blue-800 rounded-md"></div>
                  <div className="h-3 w-full bg-blue-200 dark:bg-blue-800 rounded-md"></div>
                  <div className="h-3 w-5/6 bg-blue-200 dark:bg-blue-800 rounded-md"></div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN SKELETON */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-40 bg-stone-300 dark:bg-stone-700 rounded-md"></div>
                <div className="h-4 w-10 bg-stone-300 dark:bg-stone-700 rounded-md"></div>
              </div>

              {/* Caregiver Picker Skeleton */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-stone-200 dark:bg-stone-800 rounded-xl w-full"
                  ></div>
                ))}
              </div>

              <div className="h-3 w-64 bg-stone-300 dark:bg-stone-700 rounded-md mt-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
