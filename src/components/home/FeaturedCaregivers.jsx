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
    // Fetch random featured caregivers
    axiosPublic
      .get("/caregivers?featured=true")
      .then((res) => setCaregivers(res.data.caregivers))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Top Rated Professionals
            </h2>
            <p className="mt-2 text-muted-foreground">
              Highly recommended by families like yours.
            </p>
          </div>
          <Link
            href="/caregivers"
            className="group flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View all professionals{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-stone-100 dark:bg-stone-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {caregivers.map((person) => (
              <SwiperSlide key={person._id}>
                <Link
                  href={`/caregivers/${person._id}`}
                  className="group block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all">
                    {/* Image */}
                    <div className="relative h-64 w-full bg-stone-200">
                      <Image
                        src={person.image || "/placeholder.jpg"}
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-stone-900 backdrop-blur">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {person.rating}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground truncate">
                        {person.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {person.skills?.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-1 rounded"
                          >
                            {skill.replace("-", " ")}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                        <MapPin className="h-3 w-3" />
                        {person.location?.district}, {person.location?.area}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                        <span className="font-bold text-foreground">
                          ৳{person.hourly_rate}/hr
                        </span>
                        <span className="text-xs font-bold text-stone-500 group-hover:text-primary transition-colors">
                          View Profile &rarr;
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
    </section>
  );
}
