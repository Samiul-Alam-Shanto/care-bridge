"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-50 dark:bg-stone-950">
      {/* Background Glows */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 0, 0],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="flex h-24 w-24 items-center justify-center bg-white shadow-xl dark:bg-stone-900"
        >
          <div className="h-12 w-12 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400" />
        </motion.div>

        {/* Text with Staggered Reveal */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100"
          >
            CareBridge
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-1"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"></span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
