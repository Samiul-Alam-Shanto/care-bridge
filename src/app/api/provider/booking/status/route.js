import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "caregiver") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookingId, newStatus } = await request.json();

    const client = await clientPromise;
    const db = client.db("care-bridge");

    // Update Status and Append to Lifecycle Log
    const updateResult = await db.collection("bookings").updateOne(
      {
        _id: new ObjectId(bookingId),
        caregiverId: new ObjectId(session.user.id), // Security: Ensure ownership
      },
      {
        $set: { status: newStatus },
        $push: {
          lifecycle: {
            stage: newStatus,
            timestamp: new Date(),
            updatedBy: "caregiver",
          },
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Update failed or booking not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
