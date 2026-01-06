import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 1. Basic Counters
    const [totalUsers, pendingApps, bookingsCount] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("users").countDocuments({ applicationStatus: "pending" }),
      db.collection("bookings").countDocuments(),
    ]);

    // 2. Revenue & Active Jobs
    const allBookings = await db.collection("bookings").find({}).toArray();
    const totalRevenue = allBookings.reduce(
      (sum, b) => sum + (b.totalCost || 0),
      0
    );
    const activeBookings = allBookings.filter((b) =>
      ["confirmed", "en_route", "in_progress"].includes(b.status)
    ).length;

    // 3. AGGREGATION: Revenue by Month (Last 6 Months)
    // Note: Since seed data is all "today", this might show 1 big spike.
    // In production, this groups by actual creation date.
    const revenueByMonth = await db
      .collection("bookings")
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$totalCost" },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    // Format for Recharts (Mocking previous empty months for visual appeal if data is scant)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const chartData = [];

    // Generate last 6 months data structure
    for (let i = 5; i >= 0; i--) {
      const mIndex = (currentMonth - i + 12) % 12;
      const found = revenueByMonth.find((r) => r._id === mIndex + 1);
      chartData.push({
        name: monthNames[mIndex],
        revenue: found ? found.total : 0, // Use 0 if no data for that month
      });
    }

    // 4. AGGREGATION: Popular Categories
    const categoryStats = await db
      .collection("bookings")
      .aggregate([
        {
          $group: {
            _id: "$serviceTitle", // Group by Service Name
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const pieData = categoryStats.map((c) => ({ name: c._id, value: c.count }));

    // 5. Recent Activity (Last 5 bookings)
    const recentActivity = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({
        serviceTitle: 1,
        caregiverName: 1,
        totalCost: 1,
        createdAt: 1,
        status: 1,
      })
      .toArray();

    return NextResponse.json({
      stats: {
        totalUsers,
        pendingApps,
        totalRevenue,
        activeBookings,
        chartData, // For Area Chart
        pieData, // For Donut Chart
        recentActivity,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
