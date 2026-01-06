import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Strict Admin Check
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    const bookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50) // Limit for performance
      .toArray();

    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
