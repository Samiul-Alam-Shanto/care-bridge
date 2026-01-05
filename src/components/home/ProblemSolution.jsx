"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-950/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-foreground leading-tight mb-6">
              Balancing work and care is hard. <br />
              <span className="text-primary">We make it simple.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Finding a reliable caregiver shouldn't be a second full-time job.
              Whether it's a last-minute meeting or a planned vacation, we
              connect you with professionals who treat your family like their
              own.
            </p>

            <ul className="space-y-4">
              {[
                "Zero friction booking process",
                "Real-time updates & care logs",
                "Replacement guarantee if not satisfied",
                "Transparent pricing, no hidden fees",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000"
                alt="Happy family"
                className="h-full w-full object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 p-4 backdrop-blur shadow-lg dark:bg-stone-900/90">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-white bg-stone-300 dark:border-stone-800"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">500+ Families</p>
                    <p className="text-xs text-muted-foreground">
                      Trust us every month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
