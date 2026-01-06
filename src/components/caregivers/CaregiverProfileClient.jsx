"use client";

import Image from "next/image";
import { MapPin, Star, ShieldCheck, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function CaregiverProfileClient({ caregiver }) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Sidebar Profile */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm sticky top-24">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                <Image
                  src={caregiver.image}
                  alt={caregiver.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold text-foreground text-center">
                {caregiver.name}
              </h1>
              <p className="text-center text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {caregiver.location?.area},{" "}
                {caregiver.location?.district}
              </p>

              <div className="flex justify-center gap-4 mt-6 pb-6 border-b border-border">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {caregiver.rating}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {caregiver.experienceYears || 2}+
                  </p>
                  <p className="text-xs text-muted-foreground">Years Exp</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {caregiver.reviews_count || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Hourly Rate</p>
                <p className="text-3xl font-bold text-primary">
                  ৳{caregiver.hourly_rate}
                </p>
              </div>

              {/* To book, we guide them to the service page they are skilled in */}
              <Link
                href={`/services/${caregiver.skills[0] || "elderly-care"}`}
                className="mt-6 block w-full bg-primary text-white font-bold text-center py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-4">About {caregiver.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {caregiver.bio ||
                  "No bio provided. This caregiver is a verified professional on CareBridge."}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-3">
                {caregiver.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium uppercase text-sm"
                  >
                    {skill.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-3xl p-8 flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-100">
                  Verified Professional
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 mt-1">
                  This caregiver has passed our comprehensive background check,
                  identity verification, and skill assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
