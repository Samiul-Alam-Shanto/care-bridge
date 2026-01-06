import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getUserDashboardStats(userId) {
  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");
    const userObjectId = new ObjectId(userId);

    // 1. Fetch Bookings
    const bookings = await db
      .collection("bookings")
      .find({ userId: userObjectId })
      .sort({ createdAt: -1 })
      .toArray();

    // 2. Calculate Stats
    const totalSpent = bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);
    const activeBookings = bookings.filter((b) =>
      ["confirmed", "en_route", "in_progress"].includes(b.status)
    );
    const completedBookings = bookings.filter((b) => b.status === "completed");

    // 3. Serialize IDs for Next.js
    const serializedBookings = bookings.map((b) => ({
      ...b,
      _id: b._id.toString(),
      userId: b.userId.toString(),
      caregiverId: b.caregiverId.toString(),
      serviceId: b.serviceId.toString(),
    }));

    return {
      totalBookings: bookings.length,
      totalSpent,
      activeCount: activeBookings.length,
      completedCount: completedBookings.length,
      recentBookings: serializedBookings.slice(0, 3), // Last 3
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      totalBookings: 0,
      totalSpent: 0,
      activeCount: 0,
      completedCount: 0,
      recentBookings: [],
    };
  }
}
