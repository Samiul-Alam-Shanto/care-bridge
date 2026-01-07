import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserOverview from "@/components/dashboard/overview/UserOverview";
import CaregiverOverview from "@/components/dashboard/overview/CaregiverOverview";
import AdminOverview from "@/components/dashboard/overview/AdminOverview"; // Import this

export const metadata = { title: "Dashboard | CareBridge" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  // console.log(role);
  if (role === "caregiver") return <CaregiverOverview />;
  if (role === "admin") return <AdminOverview />; // Use it here

  return <UserOverview />;
}
