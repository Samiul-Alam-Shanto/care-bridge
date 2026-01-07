import { getServiceBySlug, getCaregiversBySkill } from "@/lib/data-service";
import CaregiverPicker from "@/components/services/CaregiverPicker";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Dynamic SEO Metadata
// Dynamic SEO Metadata (Production Ready)
export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | CareBridge",
      description: "The requested healthcare service does not exist.",
    };
  }

  const url = `https://care-bridge-seven.vercel.app/services/${service.slug}`;

  return {
    title: `${service.title} | CareBridge`,
    description: service.description,

    openGraph: {
      title: `${service.title} | CareBridge`,
      description: service.description,
      url,
      siteName: "CareBridge",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: `${service.title} | CareBridge`,
      description: service.description,
      images: [service.image],
    },

    alternates: {
      canonical: url,
    },
  };
}

export default async function ServiceDetailsPage(props) {
  // NEXT.JS 16 FIX: Await params first
  const params = await props.params;

  // 1. Fetch Service Data
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  // 2. Fetch Matching Caregivers
  const caregivers = await getCaregiversBySkill(service.slug);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      {/* HERO BANNER */}
      <div className="relative h-64 md:h-80 w-full bg-stone-900 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-4 md:px-8 z-10">
          <span className="inline-block rounded-md bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-bold text-emerald-300 w-fit mb-4 uppercase tracking-wider backdrop-blur-md">
            {service.category} Category
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {service.title}
          </h1>
          <div className="flex items-center gap-2 text-stone-200">
            <span className="text-amber-400 font-bold">★ {service.rating}</span>
            <span>({service.total_reviews} Reviews)</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: INFO (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About this Service
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                What's Included?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-card border border-border"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Safety Notice */}
            <section className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">
                    Verified & Safe
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    All caregivers listed for this service have passed our
                    rigorous 5-step background check and skill assessment.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BOOKING/PICKER (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Available Professionals
                </h2>
                <span className="text-sm font-medium text-muted-foreground">
                  {caregivers.length} found
                </span>
              </div>

              {/* The Carousel Picker */}
              <CaregiverPicker caregivers={caregivers} service={service} />

              <p className="mt-6 text-center text-xs text-muted-foreground">
                By booking, you agree to our Terms of Service. Payment is held
                securely until service completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
