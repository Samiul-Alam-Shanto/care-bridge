import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { bookingId, newCaregiverId } = await request.json();
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 1. Get New Caregiver Details
    const newProvider = await db
      .collection("users")
      .findOne({ _id: new ObjectId(newCaregiverId) });
    if (!newProvider)
      return NextResponse.json(
        { error: "Caregiver not found" },
        { status: 404 }
      );

    // 2. Update Booking
    // We update ID, Name, Image, and reset Status to 'confirmed' (Force Assign)
    await db.collection("bookings").updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          caregiverId: new ObjectId(newCaregiverId),
          caregiverName: newProvider.name,
          caregiverImage: newProvider.image,
          status: "confirmed", // Reset status so new provider sees it in Active Jobs
        },
        $push: {
          lifecycle: {
            stage: "reassigned",
            timestamp: new Date(),
            message: `Admin reassigned to ${newProvider.name}`,
          },
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Reassign failed" }, { status: 500 });
  }
}
