import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader"; // Import Header
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-background">
      {/* 1. Sidebar (Fixed Left) */}
      <Sidebar />

      {/* 2. Main Area */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* Dashboard Header (Sticky Top) */}
        <DashboardHeader />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
