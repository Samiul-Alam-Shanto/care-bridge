"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { axiosSecure } from "@/lib/axios"; // Secure Axios
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState([]); // Stores Array of Strings (Caregiver IDs)

  useEffect(() => {
    const loadWishlist = async () => {
      if (status === "authenticated") {
        try {
          const { data } = await axiosSecure.get("/user/wishlist");
          setWishlist(data.favorites || []);
        } catch (e) {
          console.error("Failed to load wishlist", e);
        }
      } else {
        const local = JSON.parse(
          localStorage.getItem("carebridge_wishlist") || "[]"
        );
        setWishlist(local);
      }
    };

    if (status !== "loading") loadWishlist();
  }, [status]);

  const toggleWishlist = async (caregiverId) => {
    // Optimistic Update
    const isLiked = wishlist.includes(caregiverId);
    let newWishlist;

    if (isLiked) {
      newWishlist = wishlist.filter((id) => id !== caregiverId);
      toast("Removed from Favorites", { icon: "💔" });
    } else {
      newWishlist = [...wishlist, caregiverId];
      toast("Saved to Favorites", { icon: "❤️" });
    }

    setWishlist(newWishlist);

    // Persist
    if (status === "authenticated") {
      try {
        await axiosSecure.post("/user/wishlist", { caregiverId });
      } catch (err) {
        console.error("Failed to sync wishlist", err);
        setWishlist(wishlist); // Rollback on error
      }
    } else {
      localStorage.setItem("carebridge_wishlist", JSON.stringify(newWishlist));
    }
  };

  const isInWishlist = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
