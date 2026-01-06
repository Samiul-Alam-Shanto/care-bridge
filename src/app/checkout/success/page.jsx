"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"; // Added AlertCircle
import Link from "next/link";
import { axiosSecure } from "@/lib/axios"; // Use Axios

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    if (!paymentIntentId) {
      Promise.resolve().then(() => {
        setStatus("error");
      });
      return;
    }

    const verifyAndCreateBooking = async () => {
      try {
        // Attempt to get local data (might be null if refreshed)
        const localDataString = localStorage.getItem(
          "carebridge_checkout_item"
        );
        const bookingData = localDataString
          ? JSON.parse(localDataString)
          : null;

        // Send request to backend (Axios)
        // We send bookingData (if available) OR null. The backend now handles null if booking exists.
        const { data } = await axiosSecure.post("/payment/success", {
          paymentIntentId,
          bookingData,
        });

        if (data.success) {
          setStatus("success");

          // Only clear if we actually had data
          if (localDataString) {
            clearCart();
            localStorage.removeItem("carebridge_checkout_item");
          }
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verifyAndCreateBooking();
  }, [paymentIntentId, clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-border">
        {status === "loading" && (
          <div className="py-12">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-4 text-xl font-bold text-foreground">
              Verifying Payment...
            </h2>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="py-8 animate-in zoom-in duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your payment was successful. The caregiver has been notified.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/dashboard"
                className="block w-full rounded-xl bg-primary py-3.5 text-white font-bold shadow-lg hover:bg-emerald-700 transition-all"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="block w-full rounded-xl border border-border bg-transparent py-3.5 font-semibold text-foreground hover:bg-stone-50 transition-all"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Verification Issue
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              We couldn't verify the booking automatically, but if you paid,
              your funds are safe.
            </p>
            <p className="text-xs text-muted-foreground mt-4 bg-stone-100 p-2 rounded">
              Ref ID: {paymentIntentId?.slice(-8)}
            </p>
            <Link
              href="/dashboard"
              className="mt-6 block w-full rounded-xl bg-stone-900 py-3 text-white font-bold"
            >
              Check Dashboard Anyway
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
