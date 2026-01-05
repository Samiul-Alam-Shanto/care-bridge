"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages, currentPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Helper to change page number in URL
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null; // Don't show if only 1 page

  return (
    <div className="flex items-center gap-4">
      {/* Previous Button */}
      <button
        disabled={currentPage <= 1}
        onClick={() => createPageURL(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => createPageURL(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
