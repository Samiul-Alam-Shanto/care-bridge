"use client";

import { Trash2, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Info Section */}
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={item.caregiverImage}
            alt={item.caregiverName}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground">{item.serviceTitle}</h4>
          <p className="text-sm text-primary font-medium">
            with {item.caregiverName}
          </p>

          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {format(new Date(item.startDate), "MMM d")} -{" "}
                {format(new Date(item.endDate), "MMM d, yyyy")}
              </span>
              <span className="ml-1 rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                {item.totalDays} Days
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>
                {item.location.area}, {item.location.district}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price & Action Section */}
      <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-2">
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">
            ৳{item.totalCost.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">৳{item.hourlyRate}/hr</p>
        </div>

        <button
          onClick={() => onRemove()}
          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> Remove
        </button>
      </div>
    </div>
  );
}
