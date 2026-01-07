"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Star, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { axiosPublic } from "@/lib/axios";
import Image from "next/image";

export default function FeaturedCaregivers() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/caregivers?featured=true")
      .then((res) => setCaregivers(res.data.caregivers))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 md:py-32 bg-stone-50 dark:bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
              Our Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Meet our Top Rated Professionals
            </h2>
            <p className="text-muted-foreground text-lg">
              Highly qualified, background-checked, and loved by families across
              the country.
            </p>
          </div>

          <Link
            href="/caregivers"
            className="hidden md:flex group items-center gap-2 font-bold text-primary hover:text-emerald-700 transition-colors bg-white dark:bg-stone-900 px-6 py-3 rounded-full border border-border hover:shadow-md"
          >
            View All Experts{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-100 rounded-3xl bg-stone-200 dark:bg-stone-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 }, // Tablets
                1024: { slidesPerView: 3 }, // Small Desktop
                1280: { slidesPerView: 4 }, // Large Desktop
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="pb-16" // Allow shadows to overflow
            >
              {caregivers.map((person) => (
                <SwiperSlide key={person._id}>
                  <Link
                    href={`/caregivers/${person._id}`}
                    className="group block h-full"
                  >
                    <div className="relative flex flex-col h-full overflow-hidden rounded-3xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30">
                      {/* Image Container */}
                      <div className="relative h-72 w-full bg-stone-200 overflow-hidden">
                        <Image
                          src={person.image || "/placeholder.jpg"}
                          alt={person.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-stone-900 shadow-sm backdrop-blur-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {person.rating}
                        </div>

                        {/* Overlay Gradient (Only on hover) */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-foreground truncate">
                            {person.name}
                          </h3>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {person.skills?.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center rounded-md bg-stone-100 dark:bg-stone-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-600 dark:text-stone-300"
                              >
                                {skill.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto space-y-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0 text-primary" />
                            <span className="truncate">
                              {person.location?.district},{" "}
                              {person.location?.area}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-border pt-4">
                            <div>
                              <p className="text-xs text-muted-foreground font-medium uppercase">
                                Starting at
                              </p>
                              <p className="font-bold text-lg text-primary">
                                ৳{person.hourly_rate}
                                <span className="text-sm font-normal text-muted-foreground">
                                  /hr
                                </span>
                              </p>
                            </div>

                            <div className="h-10 w-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                              <ArrowRight className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/caregivers"
            className="inline-flex items-center justify-center gap-2 w-full font-bold text-primary bg-white dark:bg-stone-900 px-6 py-4 rounded-xl border border-border shadow-sm"
          >
            View All Experts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
