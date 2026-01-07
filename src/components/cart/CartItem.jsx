"use client";

import { Trash2, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30">
      {/* Image & Main Info */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-stone-100">
          <Image
            src={item.caregiverImage}
            alt={item.caregiverName}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-lg">
            {item.serviceTitle}
          </h4>
          <p className="text-sm font-medium text-primary">
            with {item.caregiverName}
          </p>

          {/* Mobile-only date view */}
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
            <Calendar className="h-3 w-3" />
            <span>
              {format(new Date(item.startDate), "MMM d")} -{" "}
              {format(new Date(item.endDate), "MMM d")}
            </span>
          </div>
        </div>
      </div>

      {/* Details (Hidden on tiny screens, visible on desktop) */}
      <div className="hidden sm:grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary/70" />
          <span>
            {format(new Date(item.startDate), "MMM d")} -{" "}
            {format(new Date(item.endDate), "MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary/70" />
          <span>{item.totalDays} Days</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <MapPin className="h-4 w-4 text-primary/70" />
          <span>
            {item.location.area}, {item.location.district}
          </span>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex w-full sm:w-auto items-center justify-between sm:flex-col sm:items-end sm:gap-1">
        <div className="text-right">
          <p className="text-xl font-bold text-foreground">
            ৳{item.totalCost.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">৳{item.hourlyRate}/hr</p>
        </div>

        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> Remove
        </button>
      </div>
    </div>
  );
}
