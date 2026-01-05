import { getAllServices } from "@/lib/data-service";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceFilter from "@/components/services/ServiceFilter";
import ServiceSearch from "@/components/services/ServiceSearch";
import Pagination from "@/components/services/Pagination"; // We will make this new component

export const metadata = {
  title: "Search Services | CareBridge",
  description:
    "Find the perfect caregiver. Filter by category, price, and needs.",
};

// In Next.js 15/16, searchParams is a Promise. We must async/await it.
export default async function ServicesPage(props) {
  const searchParams = await props.searchParams;

  // 1. Extract values safely (default to empty if missing)
  const query = searchParams.search || "";
  const category = searchParams.category || "all";
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";
  const page = searchParams.page || 1;

  // 2. Fetch Data
  const { services, totalPages, currentPage } = await getAllServices({
    search: query,
    category,
    minPrice,
    maxPrice,
    page,
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Services</h1>
          <p className="text-muted-foreground mt-1">
            Browse our verified care professionals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <ServiceFilter />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Search Bar */}
            <div className="w-full">
              <ServiceSearch />
            </div>

            {/* Results Grid */}
            {services.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-12 flex justify-center">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                  />
                </div>
              </>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-stone-100/50 py-20 text-center dark:bg-stone-900/50">
                <div className="mb-4 text-4xl">🔍</div>
                <h3 className="text-xl font-bold text-foreground">
                  No services found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Try clearing your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
