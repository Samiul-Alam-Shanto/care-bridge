"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Mrs. Salma Rahman",
    location: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    text: "I was hesitant about hiring a stranger for my mother, but CareBridge's verification process gave me peace of mind. The caregiver is now like family.",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    location: "Agrabad, Chattogram",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    text: "Found a babysitter in less than 2 hours for an emergency. The tracking feature and daily logs are amazing features I didn't know I needed.",
  },
  {
    id: 3,
    name: "Dr. Farhana Yeasmin",
    location: "Sylhet Sadar",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    text: "As a doctor, I know quality care when I see it. The patient support staff provided by CareBridge was professional and medically competent.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-900/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Trusted by 5,000+ Families
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000 }}
          // pagination={{ clickable: true }}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="relative h-75 rounded-3xl bg-background p-8 shadow-sm border border-border transition-transform hover:-translate-y-1 hover:shadow-md">
                <Quote className="absolute top-8 right-8 h-8 w-8 text-primary/20" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mb-8 text-muted-foreground leading-relaxed italic">
                  &quot;{review.text}&quot;
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">
                      {review.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
