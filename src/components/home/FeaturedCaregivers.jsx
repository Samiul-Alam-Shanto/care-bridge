"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

const caregivers = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Elderly Care Specialist",
    rating: 4.9,
    reviews: 124,
    location: "Dhaka, Uttara",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    role: "Patient Support (Male)",
    rating: 5.0,
    reviews: 89,
    location: "Chattogram, Nasirabad",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
  },
  {
    id: 3,
    name: "Fatima Begum",
    role: "Certified Babysitter",
    rating: 4.8,
    reviews: 210,
    location: "Sylhet, Zindabazar",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
  },
  {
    id: 4,
    name: "Dr. Anisul Haque",
    role: "Physiotherapy Expert",
    rating: 4.9,
    reviews: 56,
    location: "Dhaka, Dhanmondi",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400",
  },
];

export default function FeaturedCaregivers() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
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
            href="/search"
            className="text-primary font-semibold hover:underline"
          >
            View all caregivers
          </Link>
        </div>

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
            <SwiperSlide key={person.id}>
              <div className="group rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-lg">
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-stone-900 backdrop-blur">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {person.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {person.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {person.role}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3" />
                  {person.location}
                </div>

                <button className="w-full rounded-lg bg-stone-100 py-2.5 text-sm font-bold text-stone-900 transition-colors hover:bg-primary hover:text-white dark:bg-stone-800 dark:text-stone-100">
                  View Profile
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
