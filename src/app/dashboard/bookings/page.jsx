"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/user/bookings")
      .then(({ data }) => setBookings(data.bookings))
      .catch((err) => console.error(err))
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
      <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-card border border-border shadow-sm"
            >
              {/* Image & Basic Info */}
              <div className="flex items-start gap-4 md:w-1/3">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                  <Image
                    src={booking.caregiverImage}
                    alt="Caregiver"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {booking.serviceTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    with {booking.caregiverName}
                  </p>
                  <StatusBadge status={booking.status} />
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(booking.startDate), "MMM d")} -{" "}
                    {format(new Date(booking.endDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{booking.totalDays} Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {booking.location.area}, {booking.location.district}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">
                    Total: ৳{booking.totalCost}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-sm font-medium hover:bg-stone-200 transition-colors">
                  View Receipt
                </button>
                {/* Only show Track button if active */}
                {["confirmed", "en_route", "in_progress"].includes(
                  booking.status
                ) && (
                  <a
                    href={`/dashboard/track/${booking._id}`}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-center text-sm font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Track Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">No bookings found.</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending_approval: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    en_route: "bg-purple-100 text-purple-700",
    in_progress: "bg-emerald-100 text-emerald-700",
    completed: "bg-stone-200 text-stone-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        styles[status] || styles.pending_approval
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
