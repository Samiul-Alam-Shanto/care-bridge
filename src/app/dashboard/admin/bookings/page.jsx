"use client";

import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { Loader2, User, RefreshCw, X } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [caregivers, setCaregivers] = useState([]); // List for dropdown
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newCaregiverId, setNewCaregiverId] = useState("");

  const fetchData = async () => {
    try {
      const [bRes, cRes] = await Promise.all([
        axiosSecure.get("/admin/bookings"),
        axiosSecure.get("/admin/caregivers"),
      ]);
      setBookings(bRes.data.bookings);
      setCaregivers(cRes.data.caregivers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReassign = async () => {
    if (!newCaregiverId) return toast.error("Select a caregiver");

    const toastId = toast.loading("Assigning...");
    try {
      await axiosSecure.put("/admin/bookings/reassign", {
        bookingId: selectedBooking._id,
        newCaregiverId,
      });
      toast.success("Caregiver Assigned", { id: toastId });
      setSelectedBooking(null); // Close modal
      fetchData(); // Refresh list
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
    <div className="max-w-6xl relative">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Global Booking History
      </h1>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 dark:bg-stone-900 border-b border-border text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Current Provider</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50"
              >
                <td className="px-6 py-4 font-medium">
                  {booking.serviceTitle}
                </td>
                <td className="px-6 py-4 text-primary">
                  {booking.caregiverName}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs uppercase font-bold">
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                  >
                    <RefreshCw className="h-3 w-3" /> Reassign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REASSIGN MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card p-6 rounded-2xl w-full max-w-md shadow-2xl border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Assign New Caregiver</h3>
              <button onClick={() => setSelectedBooking(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Booking: <strong>{selectedBooking.serviceTitle}</strong> <br />
              Current:{" "}
              <span className="text-red-500">
                {selectedBooking.caregiverName}
              </span>
            </p>

            <label className="block text-sm font-medium mb-2">
              Select Replacement:
            </label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background mb-6"
              onChange={(e) => setNewCaregiverId(e.target.value)}
            >
              <option value="">-- Select Caregiver --</option>
              {caregivers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleReassign}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-emerald-700"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
