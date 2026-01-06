"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    // 1. Confirm Payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect to a success page after payment
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    // This code only runs if an error occurred (otherwise Stripe redirects)
    if (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-foreground">
          Payment Details
        </h3>

        {/* Stripe's secure UI element */}
        <PaymentElement />

        {errorMessage && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20">
            {errorMessage}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all"
      >
        {loading ? "Processing..." : `Pay ৳${amount.toLocaleString()}`}
      </button>
    </form>
  );
}
