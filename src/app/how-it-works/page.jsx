import Link from "next/link";
import { Search, CalendarCheck, UserCheck, Smile } from "lucide-react";

export const metadata = {
  title: "How It Works | CareBridge",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          How CareBridge Works
        </h1>
        <p className="text-muted-foreground text-lg">
          Simple, transparent, and secure.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <StepCard
          num="01"
          title="Search & Filter"
          desc="Browse profiles based on service type (Elderly, Baby, etc.), location, and price. Read verified reviews from other families."
          icon={Search}
        />
        <StepCard
          num="02"
          title="Select & Book"
          desc="Choose your preferred professional. Select your dates and times. You can book for a single day or recurring weeks."
          icon={CalendarCheck}
        />
        <StepCard
          num="03"
          title="Secure Payment"
          desc="Pay securely online. We hold the funds in an escrow account. The caregiver is paid only after the service is successfully completed."
          icon={UserCheck}
        />
        <StepCard
          num="04"
          title="Relax & Track"
          desc="Get live updates when the caregiver is en route. Receive daily care logs. Rate your experience afterwards."
          icon={Smile}
        />
      </div>

      <div className="mt-20 text-center">
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-emerald-700 transition-all"
        >
          Find a Caregiver Now
        </Link>
      </div>
    </div>
  );
}

function StepCard({ num, title, desc, icon: Icon }) {
  return (
    <div className="flex gap-6 p-8 bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="text-5xl font-bold text-stone-200 dark:text-stone-800">
        {num}
      </div>
      <div>
        <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
