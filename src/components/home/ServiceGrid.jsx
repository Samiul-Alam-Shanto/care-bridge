"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Baby, User, Stethoscope, HeartPulse } from "lucide-react";

const services = [
  {
    id: "baby-care",
    title: "Baby Care",
    desc: "Experienced nannies for infants & toddlers.",
    price: "From ৳300/hr",
    icon: Baby,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30",
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    desc: "Companionship, medication & mobility support.",
    price: "From ৳400/hr",
    icon: User,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
  },
  {
    id: "patient-care",
    title: "Patient Support",
    desc: "Post-surgery recovery & hospital assistance.",
    price: "From ৳500/hr",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  },
  {
    id: "special-needs",
    title: "Special Needs",
    desc: "Specialized care for autism & disabilities.",
    price: "From ৳450/hr",
    icon: HeartPulse,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Our Care Services
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Professional support tailored to your family's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/services/${item.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-2xl hover:border-primary/50"
              >
                {/* Icon */}
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <item.icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Price Reveal Section */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Starting at
                      </p>
                      <p className="font-bold text-primary">{item.price}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-900 transition-all group-hover:bg-primary group-hover:text-white dark:bg-stone-800 dark:text-stone-100">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
