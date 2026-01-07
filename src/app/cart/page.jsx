"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, isLoaded } = useCart();
  const { status } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // For V1, we checkout the FIRST item. Multi-cart is complex for Stripe V1.
    const itemToCheckout = cart[0];
    localStorage.setItem(
      "carebridge_checkout_item",
      JSON.stringify(itemToCheckout)
    );

    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <ShoppingBag className="h-8 w-8" />
          </div>
          Your Cart ({cart.length})
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.caregiverId}-${index}`}
                  item={item}
                  onRemove={() => removeFromCart(index)}
                />
              ))}

              {/* Trust Badge */}
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-800 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-900">
                <ShieldCheck className="h-5 w-5" />
                <p className="text-sm font-medium">
                  Your booking is protected by our Satisfaction Guarantee. Funds
                  are held securely until service completion.
                </p>
              </div>
            </div>

            {/* Right: Summary Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-xl">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Booking Summary
                </h3>

                <div className="space-y-4 border-b border-border pb-6 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ৳{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Service Fee (5%)
                    </span>
                    <span className="font-medium">
                      ৳{(cartTotal * 0.05).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-৳0</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-foreground">
                    Total Due
                  </span>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-primary">
                      ৳{(cartTotal * 1.05).toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Includes VAT
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="group w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Proceed to Checkout{" "}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By checking out, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border-2 border-dashed border-border bg-stone-100/50 dark:bg-stone-900/50">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm mb-8">
              Looks like you haven't selected a professional yet. Browse our
              verified caregivers to find the perfect match.
            </p>
            <Link
              href="/services"
              className="rounded-xl bg-primary px-8 py-3.5 font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:-translate-y-1"
            >
              Browse Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
