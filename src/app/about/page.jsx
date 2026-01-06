import Image from "next/image";
import { Users, Heart, Shield } from "lucide-react";

export const metadata = {
  title: "About Us | CareBridge",
  description:
    "Learn about our mission to provide safe, verified caregiving services in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-100 w-full flex items-center justify-center bg-stone-900 text-center px-4">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000"
            alt="Caregiving Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Care is Our Calling
          </h1>
          <p className="text-lg md:text-xl text-stone-200">
            We are bridging the gap between professional caregivers and families
            who need them most.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Finding reliable care in Bangladesh has historically been
              difficult. Unverified references, safety concerns, and lack of
              training were the norm.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              CareBridge was founded to change that. We believe every family
              deserves peace of mind knowing their loved ones are in safe,
              capable hands. We are building the digital infrastructure for the
              care economy.
            </p>
          </div>
          <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1000"
              alt="Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-stone-50 dark:bg-stone-900/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={Shield}
              title="Trust First"
              desc="We verify every ID, background, and certificate. Safety is non-negotiable."
            />
            <ValueCard
              icon={Heart}
              title="Empathy"
              desc="Care is personal. We treat every client and caregiver with dignity and respect."
            />
            <ValueCard
              icon={Users}
              title="Community"
              desc="We are creating dignifying jobs for thousands of skilled workers in Bangladesh."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, desc }) {
  return (
    <div className="p-8 bg-card border border-border rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
