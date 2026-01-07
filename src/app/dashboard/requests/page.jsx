"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, MapPin, Calendar, Check, X } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function JobRequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await axiosSecure.get("/provider/bookings");
      const pending = data.bookings.filter(
        (b) => b.status === "pending_approval"
      );
      setRequests(pending);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    const toastId = toast.loading("Processing...");
    try {
      await axiosSecure.put("/provider/booking/status", {
        bookingId: id,
        newStatus: status,
      });
      toast.success(status === "confirmed" ? "Job Accepted!" : "Job Declined", {
        id: toastId,
      });
      fetchRequests(); // Refresh list
    } catch (error) {
      toast.error("Action failed", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        New Job Requests
      </h1>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((job) => (
            <div
              key={job._id}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-foreground">
                  {job.serviceTitle}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(job.startDate), "MMM d")} -{" "}
                    {format(new Date(job.endDate), "MMM d")} ({job.totalDays}{" "}
                    Days)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {job.location.area}, {job.location.district}
                  </span>
                </div>
                <p className="font-medium text-emerald-600">
                  Earnings: ৳{job.totalCost}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAction(job._id, "cancelled")}
                  className="px-4 py-2 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" /> Decline
                </button>
                <button
                  onClick={() => handleAction(job._id, "confirmed")}
                  className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-2"
                >
                  <Check className="h-4 w-4" /> Accept Job
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">
            No new job requests at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
