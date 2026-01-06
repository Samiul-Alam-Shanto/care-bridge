"use client";

import { Check, Circle, Car, Home, Clock } from "lucide-react";

// Define the order of states
const STEPS = [
  { id: "pending_approval", label: "Request Sent", icon: Clock },
  { id: "confirmed", label: "Caregiver Accepted", icon: Check },
  { id: "en_route", label: "Caregiver On The Way", icon: Car },
  { id: "in_progress", label: "Service In Progress", icon: Home },
  { id: "completed", label: "Service Completed", icon: Check },
];

export default function Timeline({ status, lifecycle }) {
  // Find current step index
  const currentIndex = STEPS.findIndex((s) => s.id === status);

  // Helper to check if step is passed
  const isPassed = (stepId) => {
    const stepIndex = STEPS.findIndex((s) => s.id === stepId);
    return stepIndex <= currentIndex;
  };

  // Helper to get timestamp from lifecycle log
  const getTime = (stepId) => {
    const log = lifecycle?.find((l) => l.stage === stepId);
    if (!log) return null;
    return new Date(log.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative pl-4">
      {/* Vertical Line */}
      <div className="absolute left-7 top-2 bottom-6 w-0.5 bg-stone-200 dark:bg-stone-800" />

      <div className="space-y-8">
        {STEPS.map((step, index) => {
          const active = status === step.id;
          const passed = isPassed(step.id);
          const time = getTime(step.id);

          return (
            <div key={step.id} className="relative flex items-center gap-6">
              {/* Icon Circle */}
              <div
                className={`
                  relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 
                  ${
                    active
                      ? "bg-primary border-primary ring-4 ring-primary/20 scale-125"
                      : passed
                      ? "bg-primary border-primary"
                      : "bg-background border-stone-300 dark:border-stone-700"
                  } transition-all duration-500
                `}
              >
                {passed && !active && <Check className="h-3 w-3 text-white" />}
                {active && (
                  <step.icon className="h-3 w-3 text-white animate-pulse" />
                )}
                {!passed && !active && (
                  <Circle className="h-2 w-2 text-stone-300" />
                )}
              </div>

              {/* Text Info */}
              <div
                className={`flex-1 ${passed ? "opacity-100" : "opacity-40"}`}
              >
                <h4
                  className={`text-sm font-bold ${
                    active ? "text-primary" : "text-foreground"
                  }`}
                >
                  {step.label}
                </h4>
                {time && (
                  <p className="text-xs text-muted-foreground">{time}</p>
                )}

                {/* Active Status Description */}
                {active && step.id === "en_route" && (
                  <p className="text-xs text-primary mt-1 animate-pulse">
                    Caregiver is driving to your location...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
