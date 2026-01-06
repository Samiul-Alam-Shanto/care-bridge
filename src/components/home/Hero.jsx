"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles - CRITICAL: Must be imported in this exact order
import "swiper/css";
import "swiper/css/effect-fade";

import { Search, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop",
    title: "Expert Care for Your Elderly Loved Ones",
    subtitle: "Compassionate, verified professionals ready to help at home.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop",
    title: "Trusted Babysitters for Peace of Mind",
    subtitle: "Qualified nannies background-checked for your child's safety.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2000&auto=format&fit=crop",
    title: "Professional Patient Care Support",
    subtitle:
      "Post-surgery and specialized medical assistance at your doorstep.",
  },
];

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (service) params.set("category", service);
    router.push(`/services?${params.toString()}`);
  };

  return (
    <section className="relative mt-16 h-[80vh] min-h-150 w-full overflow-hidden bg-stone-900">
      {/* SLIDER BACKGROUND */}
      <div className="absolute inset-0 h-full w-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    filter: "brightness(0.5)",
                  }}
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28, 25, 23, 1) 0%, rgba(28, 25, 23, 0.4) 50%, transparent 100%)",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto flex h-full flex-col justify-center px-4 md:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500 mr-2"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <span className="text-sm font-semibold text-emerald-300">
                #1 Verified Care Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
              Care that feels <br /> like{" "}
              <span className="text-emerald-500">family.</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg text-stone-300 leading-relaxed">
              Instantly book verified professionals for elderly care,
              babysitting, and patient support. Safe, reliable, and available
              24/7.
            </p>
          </motion.div>

          {/* SEARCH WIDGET */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-12 w-full max-w-5xl"
          >
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:p-6">
              <form
                className="grid grid-cols-1 gap-4 md:grid-cols-12"
                onSubmit={handleSubmit}
              >
                {/* Location Input */}
                <div className="col-span-1 md:col-span-4 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <MapPin className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="District or Area (e.g. Uttara)"
                    className="w-full h-14 rounded-xl bg-white text-stone-900 pl-12 pr-4 text-base font-medium placeholder:text-stone-400 border-0 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Service Select */}
                <div className="col-span-1 md:col-span-3 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Search className="h-5 w-5 text-stone-400" />
                  </div>
                  <select
                    className="w-full h-14 rounded-xl bg-white text-stone-900 pl-12 pr-4 text-base font-medium border-0 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select Service</option>
                    <option value="elderly">Elderly Care</option>
                    <option value="baby">Babysitting</option>
                    <option value="patient">Patient Support</option>
                    <option value="special">Special Needs</option>
                  </select>
                </div>

                {/* Date Input */}
                <div className="col-span-1 md:col-span-3 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Calendar className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full h-14 rounded-xl bg-white text-stone-900 pl-12 pr-4 text-base font-medium border-0 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow cursor-pointer"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-lg hover:shadow-emerald-500/50"
                  >
                    Find Care
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
