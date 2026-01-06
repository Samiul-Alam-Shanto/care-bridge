"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, Check, X, Eye } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const { data } = await axiosSecure.get("/admin/applications");
      setApps(data.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDecision = async (id, action) => {
    const toastId = toast.loading("Processing...");
    try {
      await axiosSecure.put("/admin/applications", { userId: id, action });
      toast.success(`User ${action}d successfully`, { id: toastId });
      fetchApps(); // Refresh list
    } catch (error) {
      toast.error("Failed", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Pending Caregiver Applications
      </h1>

      {apps.length > 0 ? (
        <div className="grid gap-6">
          {apps.map((user) => (
            <div
              key={user._id}
              className="bg-card border border-border p-6 rounded-2xl flex flex-col md:flex-row gap-6 shadow-sm"
            >
              {/* Avatar */}
              <div className="relative h-20 w-20 rounded-full bg-stone-100 overflow-hidden shrink-0 border-2 border-primary/20">
                <Image
                  src={user.image || "/placeholder.jpg"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    PENDING
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  <strong>Experience:</strong> {user.experienceYears} Years
                </p>
                <div className="flex gap-2 flex-wrap">
                  {user.skills?.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="bg-stone-50 p-3 rounded-lg text-sm italic text-stone-600 mt-2">
                  "{user.bio}"
                </div>

                {/* NID Preview Link */}
                {user.nidUrl && (
                  <a
                    href={user.nidUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline mt-2"
                  >
                    <Eye className="h-3 w-3" /> View ID Document
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-center border-l border-border pl-6">
                <button
                  onClick={() => handleDecision(user._id, "approve")}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
                <button
                  onClick={() => handleDecision(user._id, "reject")}
                  className="flex items-center gap-2 px-6 py-2 border border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors"
                >
                  <X className="h-4 w-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl bg-stone-50">
          <p className="text-muted-foreground">
            No pending applications found.
          </p>
        </div>
      )}
    </div>
  );
}
