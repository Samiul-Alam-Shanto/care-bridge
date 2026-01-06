"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, Car, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CaregiverOverview() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logic
  const fetchJobs = async () => {
    try {
      const { data } = await axiosSecure.get("/provider/bookings");
      // Filter only "Active" states
      const active = data.bookings.filter((b) =>
        ["confirmed", "en_route", "in_progress"].includes(b.status)
      );
      setActiveJobs(active);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Status Update Logic
  const updateStatus = async (id, status) => {
    const toastId = toast.loading("Updating status...");
    try {
      await axiosSecure.put("/provider/booking/status", {
        bookingId: id,
        newStatus: status,
      });
      toast.success("Status Updated", { id: toastId });
      fetchJobs(); // Refresh UI
    } catch (error) {
      toast.error("Update failed", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Work Console</h1>
        <p className="text-muted-foreground">
          Manage your active jobs and updates.
        </p>
      </div>

      {activeJobs.length > 0 ? (
        <div className="space-y-6">
          {activeJobs.map((job) => (
            <div
              key={job._id}
              className="p-6 rounded-2xl bg-card border-l-4 border-l-primary shadow-sm border-y border-r border-border"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-xl">{job.serviceTitle}</h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {job.location.area},{" "}
                    {job.location.district}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                  {job.status.replace("_", " ")}
                </span>
              </div>

              {/* Status Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {job.status === "confirmed" && (
                  <button
                    onClick={() => updateStatus(job._id, "en_route")}
                    className="col-span-3 py-4 rounded-xl bg-primary text-white font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Car className="h-5 w-5" /> Tap when you leave (En Route)
                  </button>
                )}

                {job.status === "en_route" && (
                  <button
                    onClick={() => updateStatus(job._id, "in_progress")}
                    className="col-span-3 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MapPin className="h-5 w-5" /> Tap when you arrive
                  </button>
                )}

                {job.status === "in_progress" && (
                  <button
                    onClick={() => updateStatus(job._id, "completed")}
                    className="col-span-3 py-4 rounded-xl bg-stone-800 text-white font-bold hover:bg-stone-900 flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <CheckCircle className="h-5 w-5" /> Mark Job Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-dashed border-border">
          <div className="h-16 w-16 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No active jobs</h3>
          <p className="text-muted-foreground mt-1 mb-6">
            You are all clear for now.
          </p>
          <Link
            href="/dashboard/requests"
            className="px-6 py-3 rounded-xl bg-white border border-border font-bold text-foreground shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
          >
            Check Job Requests <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
