import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  const { id } = await params;

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id), // Ensure user owns this booking
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Serialize _id
    booking._id = booking._id.toString();
    booking.userId = booking.userId.toString();
    booking.caregiverId = booking.caregiverId.toString();
    booking.serviceId = booking.serviceId.toString();

    return NextResponse.json({ booking });
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
