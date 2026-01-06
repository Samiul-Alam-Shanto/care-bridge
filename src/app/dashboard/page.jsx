import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUserDashboardStats } from "@/lib/dashboard-service";
import { Calendar, CheckCircle, Clock, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Dashboard | CareBridge",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const stats = await getUserDashboardStats(session.user.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Hello, {session.user.name} 👋
        </h1>
        <p className="text-muted-foreground">
          Here is what's happening with your care.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          color="text-blue-500"
          bg="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          title="Active Services"
          value={stats.activeCount}
          icon={Clock}
          color="text-orange-500"
          bg="bg-orange-100 dark:bg-orange-900/30"
        />
        <StatCard
          title="Completed"
          value={stats.completedCount}
          icon={CheckCircle}
          color="text-emerald-500"
          bg="bg-emerald-100 dark:bg-emerald-900/30"
        />
        <StatCard
          title="Total Spent"
          value={`৳${stats.totalSpent.toLocaleString()}`}
          icon={Wallet}
          color="text-purple-500"
          bg="bg-purple-100 dark:bg-purple-900/30"
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-foreground">Recent Activity</h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        {stats.recentBookings.length > 0 ? (
          <div className="space-y-4">
            {stats.recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-stone-50 dark:bg-stone-900/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <Image
                      width={40}
                      height={40}
                      src={booking.caregiverImage}
                      alt="Caregiver"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      {booking.serviceTitle}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {booking.caregiverName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending_approval"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                  <p className="text-sm font-bold">৳{booking.totalCost}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No bookings yet.</p>
            <Link
              href="/services"
              className="mt-2 inline-block text-primary text-sm font-bold"
            >
              Book a Service
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Small Helper Component
function StatCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center gap-4">
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center ${bg} ${color}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
      </div>
    </div>
  );
}
