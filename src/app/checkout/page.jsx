"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Image from "next/image";

// Initialize Stripe Client
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookingData, setBookingData] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // 1. Check Auth & Load Data
  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to login, then come back here
      router.push("/login?callbackUrl=/checkout");
      return;
    }

    if (status === "authenticated") {
      const data = localStorage.getItem("carebridge_checkout_item");
      if (!data) {
        router.push("/services");
        return;
      }
      const parsed = JSON.parse(data);
      Promise.resolve().then(() => {
        setBookingData(parsed);
      });

      // Create Payment Intent on Server
      axiosSecure
        .post("/payment/create-intent", {
          bookingData: parsed,
        })
        .then(({ data }) => setClientSecret(data.clientSecret))
        .catch((err) => {
          console.error(err);
          toast.error("Failed to initialize secure payment");
        });
    }
  }, [status, router]);

  if (status === "loading" || !bookingData || !clientSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Order Summary */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={bookingData.caregiverImage}
                    alt="Caregiver"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {bookingData.caregiverName}
                  </h3>
                  <p className="text-muted-foreground">
                    {bookingData.serviceTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {bookingData.startDate} to {bookingData.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">
                    {bookingData.location.area}, {bookingData.location.district}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {bookingData.totalDays} Days
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                <span className="text-lg font-bold">Total Due</span>
                <span className="text-2xl font-bold text-primary">
                  ৳{bookingData.totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm amount={bookingData.totalCost} />
            </Elements>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Your payment is processed securely by Stripe. We do not store your
              card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
