"use client";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, FileText, BadgeCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Identity Verification",
    desc: "We verify National ID (NID) and Passport for every caregiver.",
    icon: UserCheck,
  },
  {
    title: "Criminal Background Check",
    desc: "Rigorous screening to ensure a clean history for your peace of mind.",
    icon: FileText,
  },
  {
    title: "Skill Assessment",
    desc: "Practical tests for nursing, first aid, and child care competence.",
    icon: BadgeCheck,
  },
  {
    title: "Ongoing Monitoring",
    desc: "We track performance and ratings after every single job.",
    icon: ShieldCheck,
  },
];

export default function SafetyShowcase() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-6">
              <ShieldCheck className="h-4 w-4" /> Safety First
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              We reject 90% of applicants <br />
              <span className="text-muted-foreground">
                so you get the top 10%.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Trust is the core of CareBridge. We don't just list anyone. Every
              professional goes through a strict 5-step vetting process before
              they can enter your home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center text-primary dark:bg-stone-800">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-border">
              <Image
                fill
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000"
                alt="Verified Caregiver"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs hidden sm:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">100% Verified</p>
                  <p className="text-xs text-muted-foreground">
                    Every single profile.
                  </p>
                </div>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden dark:bg-stone-800">
                <div className="bg-green-500 h-full w-full" />
              </div>
            </div>

            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
