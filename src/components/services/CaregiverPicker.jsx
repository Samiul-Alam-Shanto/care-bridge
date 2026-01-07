"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, MapPin, Heart, Video } from "lucide-react";
import Swal from "sweetalert2";
import { useWishlist } from "@/context/WishlistContext";
import BookingModal from "@/components/booking/BookingModal";
import Image from "next/image"; // IMPORTED

export default function CaregiverPicker({ caregivers, service }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);

  const handleMeetGreet = () => {
    Swal.fire({
      icon: "info",
      title: "Video Interview",
      text: "The 'Meet & Greet' video feature is coming in v2.0! For now, please book the caregiver directly.",
      confirmButtonColor: "#059669",
    });
  };

  if (caregivers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-stone-50 p-10 text-center dark:bg-stone-900">
        <p className="text-muted-foreground">
          No caregivers currently available for this category.
        </p>
        <p className="text-sm mt-2">
          Try checking back later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 1.5 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="caregiver-swiper pb-12"
      >
        {caregivers.map((person) => (
          <SwiperSlide key={person._id}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all h-full">
              {/* Image & Badge - USING NEXT/IMAGE */}
              <div className="relative h-64 w-full bg-stone-200">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <button
                  onClick={() => toggleWishlist(person._id)}
                  className="absolute top-3 right-3 z-10 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white transition-all"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(person._id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
                {person.verified && (
                  <div className="absolute top-3 left-3 z-10 rounded-md bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                    VERIFIED
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {person.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    {person.rating}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {person?.location?.district}, {person?.location?.area}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {person.bio || "Experienced professional ready to assist."}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase">
                      Rate
                    </span>
                    <p className="font-bold text-primary text-lg">
                      ৳{person.hourly_rate}/hr
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleMeetGreet}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-2.5 text-sm font-semibold text-foreground hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Video className="h-4 w-4" /> Meet
                  </button>
                  <button
                    onClick={() => setSelectedCaregiver(person)}
                    className="rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-emerald-700 shadow-md transition-colors"
                  >
                    Select & Book
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Booking Modal */}
      {selectedCaregiver && (
        <BookingModal
          caregiver={selectedCaregiver}
          service={service}
          onClose={() => setSelectedCaregiver(null)}
        />
      )}
    </div>
  );
}
