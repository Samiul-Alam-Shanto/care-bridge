import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Fallback to "user" if role is missing
  const role = session.user.role || "user";

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-background">
      {/* 1. Sidebar gets role for Desktop */}
      <Sidebar role={role} />

      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* 2. Header gets role for Mobile Menu */}
        <DashboardHeader role={role} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
