"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/lib/axios";
import { Loader2, Phone, MessageSquare, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Timeline from "@/components/dashboard/Timeline"; // We will create this next

// Fetcher function
const fetchBooking = async (id) => {
  const { data } = await axiosSecure.get(`/user/booking/${id}`);
  return data.booking;
};

export default function TrackingPage() {
  const params = useParams(); // Get ID from URL
  const bookingId = params.id;

  // React Query Hook (Polls every 5 seconds)
  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => fetchBooking(bookingId),
    refetchInterval: 5000, // AUTO-REFRESH every 5s
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Locating booking...</span>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="text-center py-20 text-red-500">Booking not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Tracking Service
          </h1>
          <p className="text-muted-foreground">
            Order ID: #{booking._id.slice(-6)}
          </p>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wide">
          {booking.status.replace("_", " ")}
        </div>
      </div>

      {/* Caregiver Card */}
      <div className="bg-card border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-stone-100 dark:border-stone-800">
          <Image
            src={booking.caregiverImage}
            alt="Caregiver"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold text-foreground">
            {booking.caregiverName}
          </h3>
          <p className="text-muted-foreground">{booking.serviceTitle}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {booking.location.area},{" "}
            {booking.location.district}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 rounded-full bg-stone-100 text-stone-600 hover:bg-primary hover:text-white transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-full bg-stone-100 text-stone-600 hover:bg-primary hover:text-white transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* The Live Timeline */}
      <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
        <h3 className="font-bold text-lg mb-6">Service Status</h3>
        <Timeline status={booking.status} lifecycle={booking.lifecycle} />
      </div>

      {/* Security Code (OTP) */}
      {["en_route", "in_progress"].includes(booking.status) && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-6 rounded-2xl text-center">
          <p className="text-indigo-600 dark:text-indigo-300 text-sm font-bold uppercase mb-2">
            Start Code
          </p>
          <div className="text-4xl font-mono font-bold tracking-widest text-indigo-900 dark:text-indigo-100">
            {booking._id.slice(0, 4).toUpperCase()} {/* Mock OTP from ID */}
          </div>
          <p className="text-xs text-indigo-500/80 mt-2">
            Share this code when the caregiver arrives.
          </p>
        </div>
      )}
    </div>
  );
}
