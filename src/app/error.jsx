"use client";

import { useEffect } from "react";
import { RefreshCw, ShieldAlert, Home } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 dark:bg-stone-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white/80 dark:bg-stone-900/80 shadow-2xl backdrop-blur-xl border border-white/20 dark:border-stone-800"
      >
        {/* Error Header */}
        <div className="bg-red-500/10 p-8 text-center border-b border-red-500/10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">System Error</h2>
          <p className="mt-2 text-sm text-red-600/80 dark:text-red-400">
            {error.message || "An unexpected error occurred."}
          </p>
        </div>

        {/* Actions */}
        <div className="p-8 space-y-4">
          <p className="text-center text-muted-foreground mb-6">
            Our engineering team has been notified. You can try refreshing the
            page or go back home.
          </p>

          <button
            onClick={() => reset()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 font-bold text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent py-3.5 font-bold text-foreground hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>

        <div className="bg-stone-50 dark:bg-stone-950/50 p-3 text-center">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Error Code: {error.digest || "500_INTERNAL_SERVER_ERROR"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
