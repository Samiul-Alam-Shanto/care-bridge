"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, isLoaded } = useCart();
  const { status } = useSession();
  const router = useRouter();

  // 1. Handle Checkout Logic
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // We only process the FIRST item for checkout in this version
    // (Stripe intent logic usually handles one booking at a time for simplicity in V1)
    // If you want multi-cart checkout, the backend API needs to loop through items.
    // For V1 "Top 0.1%" UX, let's strictly handle Single Item flow or alert user.

    // CURRENT LOGIC: Take the first item to checkout
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" /> Your Cart
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.caregiverId}-${index}`}
                  item={item}
                  onRemove={() => removeFromCart(index)}
                />
              ))}

              {/* Note about single checkout */}
              {cart.length > 1 && (
                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                  Note: For this beta version, clicking Checkout will process
                  the <strong>first item</strong> in your list. Please book
                  professionals individually.
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 border-b border-border pb-4 mb-4 text-sm">
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
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ৳{(cartTotal * 1.05).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-white font-bold shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure checkout powered by Stripe.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border-2 border-dashed border-border bg-stone-100/50 dark:bg-stone-900/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Looks like you haven't selected a caregiver yet. Browse our
              services to find the perfect match.
            </p>
            <Link
              href="/services"
              className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
