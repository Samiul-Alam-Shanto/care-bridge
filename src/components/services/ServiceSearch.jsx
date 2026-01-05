"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce"; // We need to install this

export default function ServiceSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce prevents updating the URL on every single keystroke (waits 300ms)
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    // Reset to page 1 if we had pagination (optional future proofing)
    // params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search services (e.g., 'Nanny' or 'Medical')..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        className="block w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
      />
    </div>
  );
}
