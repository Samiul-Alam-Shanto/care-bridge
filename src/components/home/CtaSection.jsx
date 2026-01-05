import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-16 md:py-24">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 -mt-10 -ml-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 -mb-10 -mr-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-white md:text-5xl leading-tight">
              Ready to find peace of mind?
            </h2>
            <p className="text-emerald-100 text-lg md:text-xl">
              Join 10,000+ families who trust CareBridge for their loved ones.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-emerald-900 transition-transform hover:scale-105 hover:bg-emerald-50 shadow-lg"
              >
                Get Started Now
              </Link>
              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-emerald-400 bg-transparent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-emerald-800"
              >
                Apply as Caregiver <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <p className="text-sm text-emerald-200 mt-6">
              No credit card required for sign up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
