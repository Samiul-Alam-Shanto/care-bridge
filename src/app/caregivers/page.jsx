import CaregiverList from "@/components/caregivers/CaregiverList"; // New Component

export const metadata = {
  title: "Find Caregivers | CareBridge",
  description: "Browse our verified professionals.",
};

export default function AllCaregiversPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Professionals
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse profiles, read reviews, and find the perfect match for your
            family's needs.
          </p>
        </div>

        {/* We separate the list into a client component for searching */}
        <CaregiverList />
      </div>
    </div>
  );
}
