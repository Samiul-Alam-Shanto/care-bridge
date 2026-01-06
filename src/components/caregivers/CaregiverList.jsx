"use client";

import { useEffect, useState } from "react";
import { axiosPublic } from "@/lib/axios";
import { Loader2, Search, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CaregiverList() {
  const [caregivers, setCaregivers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosPublic
      .get("/caregivers")
      .then((res) => {
        setCaregivers(res.data.caregivers);
        setFiltered(res.data.caregivers);
      })
      .finally(() => setLoading(false));
  }, []);

  // Simple Filter
  useEffect(() => {
    const term = search.toLowerCase();
    const result = caregivers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.location?.district.toLowerCase().includes(term) ||
        c.skills.some((s) => s.replace("-", " ").includes(term))
    );
    Promise.resolve().then(() => {
      setFiltered(result);
    });
  }, [search, caregivers]);

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, skill, or location..."
          className="w-full h-12 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((person) => (
          <Link
            key={person._id}
            href={`/caregivers/${person._id}`}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-60 w-full bg-stone-200">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
              />
              {person.verified && (
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  VERIFIED
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-foreground">
                  {person.name}
                </h3>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500" /> {person.rating}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {person.location?.district}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {person.skills?.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded text-stone-600 dark:text-stone-300"
                  >
                    {s.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
