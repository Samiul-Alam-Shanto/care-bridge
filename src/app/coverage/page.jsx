"use client";

import { useState } from "react";
import dynamic from "next/dynamic"; // Crucial for Leaflet
import locationsData from "@/lib/locations.json";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

// Dynamically import Map with SSR disabled
const MapViewer = dynamic(() => import("@/components/map/MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-stone-100">
      <p className="animate-pulse text-stone-500 font-medium">
        Loading Coverage Map...
      </p>
    </div>
  ),
});

export default function CoveragePage() {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Filter logic
  const filteredLocations = locationsData.filter(
    (loc) =>
      loc.district.toLowerCase().includes(query.toLowerCase()) ||
      loc.covered_area.some((area) =>
        area.toLowerCase().includes(query.toLowerCase())
      )
  );

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row bg-background">
      {/* Sidebar (Search & List) */}
      <div className="w-full lg:w-96 flex flex-col border-r border-border bg-card z-10 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-border bg-stone-50 dark:bg-stone-900">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Coverage Area
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            We currently serve {locationsData.length} districts across
            Bangladesh.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search District or Area..."
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc, index) => (
              <button
                key={index}
                onClick={() => setSelectedLocation(loc)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedLocation?.district === loc.district
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-background hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-foreground">
                      {loc.district}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {loc.covered_area.join(", ")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      loc.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {loc.status}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No locations found.</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-border bg-stone-50 dark:bg-stone-900">
          <Link
            href="/services"
            className="flex items-center justify-center w-full gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
          >
            Book a Service <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-full">
        <MapViewer selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}
