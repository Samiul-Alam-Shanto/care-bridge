"use client";
import { motion } from "framer-motion";
import { Search, FileCheck, CalendarCheck, CreditCard } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search & Filter",
    desc: "Choose the service type and location to find caregivers near you.",
    icon: Search,
  },
  {
    id: 2,
    title: "Select Professional",
    desc: "Review profiles, ratings, and experience. Pick the best match.",
    icon: FileCheck,
  },
  {
    id: 3,
    title: "Book Schedule",
    desc: "Select dates and duration. We handle conflicts automatically.",
    icon: CalendarCheck,
  },
  {
    id: 4,
    title: "Secure Payment",
    desc: "Pay securely via Card/MFS. Money is held until service completion.",
    icon: CreditCard,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProcessSteps() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-900/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              How CareBridge Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the care you need in 4 simple steps. No hidden fees, no
              hassle.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-border -z-10" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background border-4 border-stone-100 shadow-sm dark:border-stone-800 text-primary z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20">
                <step.icon className="h-8 w-8" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
