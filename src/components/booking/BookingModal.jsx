"use client";

import { useState } from "react";
import { X, MapPin, Calendar, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import toast from "react-hot-toast";
import locationsData from "@/lib/locations.json";
import Image from "next/image";

export default function BookingModal({ caregiver, service, onClose }) {
  const { addToCart } = useCart();
  const router = useRouter(); // We need this for redirection
  const [loading, setLoading] = useState(false);

  // Form State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const HOURS_PER_DAY = 8;
  const days =
    startDate && endDate
      ? Math.max(
          1,
          differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
        )
      : 0;

  const totalHours = days * HOURS_PER_DAY;
  const totalCost = totalHours * caregiver.hourly_rate;

  // Helper to create the booking object
  const createBookingObject = () => {
    return {
      serviceId: service._id,
      serviceTitle: service.title,
      caregiverId: caregiver._id,
      caregiverName: caregiver.name,
      caregiverImage: caregiver.image,
      startDate,
      endDate,
      totalDays: days,
      location: { district: selectedDistrict, area: selectedArea },
      hourlyRate: caregiver.hourly_rate,
      totalCost: totalCost,
      addedAt: new Date(),
    };
  };

  const validateForm = () => {
    if (!startDate || !endDate || !selectedDistrict || !selectedArea) {
      toast.error("Please select dates and location");
      return false;
    }
    return true;
  };

  // Action 1: Add to Cart & Go to Cart Page
  const handleAddToCart = () => {
    if (!validateForm()) return;
    setLoading(true);

    const item = createBookingObject();
    addToCart(item); // Add to Global State

    setLoading(false);
    onClose(); // Close Modal

    // FIX: Redirect to Cart Page immediately
    router.push("/cart");
  };

  // Action 2: Proceed to Payment (Direct Buy)
  const handleProceedToPay = () => {
    if (!validateForm()) return;

    // Save to localStorage so /checkout page can read it even after login redirect
    const item = createBookingObject();
    localStorage.setItem("carebridge_checkout_item", JSON.stringify(item));

    // Redirect to Checkout
    router.push("/checkout");
  };

  // Logic for dependent dropdowns
  const availableAreas =
    locationsData.find((d) => d.district === selectedDistrict)?.covered_area ||
    [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4 bg-muted/30">
          <h3 className="font-bold text-lg text-foreground">
            Configure Booking
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary Card */}
          <div className="flex items-center gap-4 rounded-xl bg-primary/5 p-4 border border-primary/10">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
              <Image
                src={caregiver.image}
                alt={caregiver.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Booking Professional:
              </p>
              <h4 className="font-bold text-foreground text-lg">
                {caregiver.name}
              </h4>
              <p className="text-sm font-medium text-primary">
                Rate: ৳{caregiver.hourly_rate}/hr
              </p>
            </div>
          </div>

          {/* Dates Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Select Duration
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">
                  Start Date
                </span>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">
                  End Date
                </span>
                <input
                  type="date"
                  min={startDate || new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Service Location
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedArea("");
                }}
                value={selectedDistrict}
              >
                <option value="">Select District</option>
                {locationsData.map((loc, i) => (
                  <option key={loc.district || i} value={loc.district}>
                    {loc.district}
                  </option>
                ))}
              </select>

              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary outline-none"
                disabled={!selectedDistrict}
                onChange={(e) => setSelectedArea(e.target.value)}
                value={selectedArea}
              >
                <option value="">Select Area</option>
                {availableAreas.map((area, i) => (
                  <option key={area || i} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cost Breakdown */}
          {days > 0 && (
            <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-900 border border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {days} Days ({totalHours} hours)
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">
                  ৳{caregiver.hourly_rate} x {totalHours} hrs
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg text-primary">
                <span>Total Cost</span>
                <span>৳{totalCost.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Dual Buttons) */}
        <div className="p-4 border-t border-border bg-background grid grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            disabled={loading || totalCost === 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 font-semibold text-foreground hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-50 transition-all"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>

          <button
            onClick={handleProceedToPay}
            disabled={loading || totalCost === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all"
          >
            <CreditCard className="h-4 w-4" /> Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
