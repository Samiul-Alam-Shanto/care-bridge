"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Improved stacking on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Top Rated Professionals
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Highly recommended by families like yours.
            </p>
          </div>
          <Link
            href="/caregivers"
            className="group flex items-center gap-2 text-sm md:text-base font-semibold text-primary hover:underline"
          >
            View all professionals
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading State - Responsive Grid matching Swiper logic */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-2xl bg-stone-100 dark:bg-stone-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20} // Tighter spacing for mobile
            slidesPerView={1.2} // Show a peek of the next card on mobile
            centeredSlides={false}
            breakpoints={{
              // Mobile / Tablet Portrait
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              // Tablet Landscape
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              // Desktop
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Better for many slides on mobile
            }}
            className="pb-14 !overflow-visible md:!overflow-hidden" // Allow peek on mobile
          >
            {caregivers.map((person) => (
              <SwiperSlide key={person._id} className="h-auto">
                <Link
                  href={`/caregivers/${person._id}`}
                  className="group block h-full"
                >
                  <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative h-56 sm:h-64 w-full bg-stone-200 shrink-0">
                      <Image
                        src={person.image || "/placeholder.jpg"}
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-stone-900 shadow-sm backdrop-blur">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {person.rating}
                      </div>
                    </div>

                    {/* Details Container - Uses flex-grow to keep buttons aligned */}
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-bold text-foreground truncate">
                        {person.name}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {person.skills?.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] md:text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 md:py-1 rounded"
                          >
                            {skill.replace("-", " ")}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground mt-4">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">
                          {person.location?.district}, {person.location?.area}
                        </span>
                      </div>

                      {/* Spacer to push price to bottom */}
                      <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                        <span className="font-bold text-sm md:text-base text-foreground">
                          ৳{person.hourly_rate}
                          <span className="text-[10px] md:text-xs font-normal text-muted-foreground">
                            /hr
                          </span>
                        </span>
                        <span className="text-[11px] md:text-xs font-bold text-stone-500 group-hover:text-primary transition-colors flex items-center gap-1">
                          Profile <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Custom Styles for Swiper Pagination Dots */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: hsl(var(--primary)) !important;
        }
        .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </section>
  );
}
