"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Filter, X } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", label: "All Services" },
  { id: "elderly", label: "Elderly Care" },
  { id: "baby", label: "Baby & Child" },
  { id: "medical", label: "Medical Support" },
  { id: "special", label: "Special Needs" },
  { id: "mother", label: "Maternity" },
];

export default function ServiceFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // State for inputs
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Helper: Update URL Params
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    // Reset to Page 1 when filtering
    params.set("page", "1");

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const applyPrice = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset page

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    replace(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    setMinPrice("");
    setMaxPrice("");
    replace(pathname); // Go to /services clean
  };

  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-foreground">
          <Filter className="h-4 w-4" /> Filters
        </h3>
        {searchParams.toString().length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-red-500 hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={currentCategory === cat.id}
                onChange={(e) => updateParams("category", e.target.value)}
                className="accent-primary h-4 w-4"
              />
              <span
                className={`text-sm ${
                  currentCategory === cat.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
          Hourly Rate (৳)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-3 w-full rounded-lg bg-stone-200 py-2 text-xs font-bold text-stone-800 hover:bg-primary hover:text-white transition-colors dark:bg-stone-800 dark:text-stone-200"
        >
          Apply Price
        </button>
      </div>
    </div>
  );
}
