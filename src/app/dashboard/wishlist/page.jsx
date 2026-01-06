"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { useWishlist } from "@/context/WishlistContext";
import { Loader2, Heart, MapPin, Star, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, wishlist } = useWishlist();

  // Fetch full details
  useEffect(() => {
    const fetchWishlistDetails = async () => {
      try {
        const { data } = await axiosSecure.get("/user/wishlist/details");
        setCaregivers(data.caregivers || []);
      } catch (error) {
        console.error("Failed to load wishlist details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistDetails();
  }, []); // Only run on mount

  // Handle local removal
  const handleRemove = (id) => {
    toggleWishlist(id); // Update Context/DB
    setCaregivers((prev) => prev.filter((c) => c._id !== id)); // Update Local UI immediately
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Saved Caregivers</h1>
        <span className="text-sm text-muted-foreground">
          {caregivers.length} saved
        </span>
      </div>

      {caregivers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {caregivers.map((person) => (
            <div
              key={person._id}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full bg-stone-200">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => handleRemove(person._id)}
                  className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-red-500 hover:bg-white transition-colors backdrop-blur-sm"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {person.verified && (
                  <div className="absolute top-3 left-3 rounded-md bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                    VERIFIED
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {person.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {person.rating}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  {person.location?.district}, {person.location?.area}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {person.skills?.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-stone-100 px-2 py-1 text-[10px] font-medium uppercase text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                    >
                      {skill.replace("-", " ")}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="text-lg font-bold text-primary">
                    ৳{person.hourly_rate}
                    <span className="text-xs text-muted-foreground font-normal">
                      /hr
                    </span>
                  </span>

                  {/* Link back to a service page to book them */}
                  {/* Since booking requires context, we redirect to a service page where they appear. 
                      Ideally, we would pass 'skill' to know which service page to go to.
                      For V1, we send them to the first skill's service page. */}
                  <Link
                    href={`/services/${person.skills?.[0] || "elderly-care"}`}
                    className="flex items-center gap-1 text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-stone-50/50 py-20 text-center dark:bg-stone-900/50">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Save professional caregivers here to book them later.
          </p>
          <Link
            href="/services"
            className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            Find Caregivers
          </Link>
        </div>
      )}
    </div>
  );
}
