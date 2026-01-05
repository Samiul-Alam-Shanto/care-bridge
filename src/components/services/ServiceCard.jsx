"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:border-primary/50"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-stone-900 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {service.rating} ({service.total_reviews})
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.features.slice(0, 2).map((feat, i) => (
            <span
              key={i}
              className="inline-block rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
            >
              {feat}
            </span>
          ))}
          {service.features.length > 2 && (
            <span className="inline-block rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800">
              +{service.features.length - 2} more
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Starting at
            </span>
            <p className="font-bold text-primary">৳{service.price_hourly}/hr</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-stone-800">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
