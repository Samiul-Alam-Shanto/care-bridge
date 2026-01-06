"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/provider/bookings")
      .then(({ data }) => {
        // Filter Completed or Cancelled
        const done = data.bookings.filter((b) =>
          ["completed", "cancelled"].includes(b.status)
        );
        setHistory(done);
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
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Work History</h1>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((job) => (
            <div
              key={job._id}
              className="flex justify-between items-center p-4 rounded-xl bg-card border border-border"
            >
              <div>
                <h3 className="font-bold text-foreground">
                  {job.serviceTitle}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(job.startDate), "MMM d, yyyy")}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    job.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
                <p className="text-sm font-bold mt-1">৳{job.totalCost}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No history yet.
        </div>
      )}
    </div>
  );
}
