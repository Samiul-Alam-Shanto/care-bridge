"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { axiosSecure } from "@/lib/axios"; // Secure Axios for user data
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load Cart Logic
  useEffect(() => {
    const initializeCart = async () => {
      // GUEST MODE: Load from LocalStorage
      const localData = localStorage.getItem("carebridge_cart");
      const localCart = localData ? JSON.parse(localData) : [];

      // AUTH MODE: Fetch from DB + Sync Local
      if (status === "authenticated") {
        try {
          // Fetch DB Cart using Axios
          const { data } = await axiosSecure.get("/user/cart");
          const dbCart = data.items || [];

          // If we have local items, merge them to DB (One-time sync)
          if (localCart.length > 0) {
            // Simple merge: DB items + Local items
            const mergedCart = [...dbCart, ...localCart];

            // Save merged to DB using Axios
            await axiosSecure.post("/user/cart", { items: mergedCart });

            setCart(mergedCart);
            localStorage.removeItem("carebridge_cart"); // Clear local after sync
            toast.success("Cart synced with account");
          } else {
            setCart(dbCart);
          }
        } catch (error) {
          console.error("Cart Sync Failed", error);
        }
      } else {
        // Just show local cart if guest
        setCart(localCart);
      }
      setIsLoaded(true);
    };

    if (status !== "loading") {
      initializeCart();
    }
  }, [status]);

  // 2. Helper to save state
  const saveCartState = async (newCart) => {
    setCart(newCart);
    if (status === "authenticated") {
      try {
        await axiosSecure.post("/user/cart", { items: newCart });
      } catch (error) {
        console.error("Failed to save cart to DB", error);
      }
    } else {
      localStorage.setItem("carebridge_cart", JSON.stringify(newCart));
    }
  };

  // 3. Actions
  const addToCart = (item) => {
    // Avoid duplicates based on caregiverId + start date
    const exists = cart.find(
      (i) =>
        i.caregiverId === item.caregiverId && i.startDate === item.startDate
    );

    if (exists) {
      toast.error("This booking is already in your cart");
      return;
    }

    const newCart = [...cart, item];
    saveCartState(newCart);
    toast.success("Added to cart");
  };

  const removeFromCart = (indexToRemove) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    saveCartState(newCart);
  };

  const clearCart = () => {
    saveCartState([]);
  };

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + (item.totalCost || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
