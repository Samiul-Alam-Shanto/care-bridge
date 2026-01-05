"use client";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function CoveragePreview() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-24 text-center">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
          alt="Map Background"
          className="h-full w-full object-cover grayscale"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/50 px-4 py-1.5 text-sm font-medium text-emerald-200 backdrop-blur border border-emerald-700 mb-6">
          <MapPin className="h-4 w-4" /> Nationwide Coverage
        </div>

        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          We cover 64 Districts <br /> in Bangladesh
        </h2>

        <p className="mb-10 text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
          From the busy streets of Dhaka to the quiet neighborhoods of Sylhet.
          Our network of verified caregivers is expanding every single day to
          reach your doorstep.
        </p>

        <Link
          href="/coverage"
          className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold text-emerald-950 transition-transform hover:scale-105 hover:bg-emerald-50 shadow-xl"
        >
          Check Coverage Map <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
