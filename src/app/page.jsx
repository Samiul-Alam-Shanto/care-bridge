import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProblemSolution from "@/components/home/ProblemSolution";
import ServiceGrid from "@/components/home/ServiceGrid";
import ProcessSteps from "@/components/home/ProcessSteps";
import SafetyShowcase from "@/components/home/SafetyShowcase";
import CoveragePreview from "@/components/home/CoveragePreview";
import FeaturedCaregivers from "@/components/home/FeaturedCaregivers";
import Testimonials from "@/components/home/Testimonials";
import FaqAccordion from "@/components/home/FaqAccordion";
import CtaSection from "@/components/home/CtaSection";

export const metadata = {
  title: "CareBridge | #1 Trusted Care Platform in Bangladesh",
  description:
    "Book verified babysitters, elderly care, and patient support professionals instantly. Safe, reliable, and available 24/7.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <ServiceGrid />
      <ProcessSteps />
      <SafetyShowcase />
      <FeaturedCaregivers />
      <CoveragePreview />
      <Testimonials />
      <FaqAccordion />
      <CtaSection />
    </main>
  );
}
