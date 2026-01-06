"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrackListPage() {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/user/bookings")
      .then(({ data }) => {
        // Filter only active jobs
        const active = data.bookings.filter((b) =>
          ["confirmed", "en_route", "in_progress"].includes(b.status)
        );
        setActiveBookings(active);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Live Tracking</h1>
      <p className="text-muted-foreground">
        Monitor ongoing services in real-time.
      </p>

      {activeBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBookings.map((booking) => (
            <Link
              key={booking._id}
              href={`/dashboard/track/${booking._id}`}
              className="group block p-6 rounded-2xl bg-card border border-primary/20 shadow-lg hover:border-primary transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {booking.serviceTitle}
                  </h3>
                  <p className="text-sm text-primary animate-pulse font-medium">
                    ● {booking.status.replace("_", " ").toUpperCase()}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {booking.location.area}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">
            No active services to track right now.
          </p>
          <Link
            href="/services"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Book a service
          </Link>
        </div>
      )}
    </div>
  );
}
