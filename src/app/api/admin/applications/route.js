import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

// GET: List Pending Applications
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db("care-bridge");

  const applications = await db
    .collection("users")
    .find({ applicationStatus: "pending" })
    .toArray();

  return NextResponse.json({ applications });
}

// PUT: Approve or Reject
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, action } = await request.json(); // action = 'approve' or 'reject'
  const client = await clientPromise;
  const db = client.db("care-bridge");

  if (action === "approve") {
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          role: "caregiver",
          applicationStatus: "approved",
          verified: true,
          hourly_rate: 300, // Set default start rate
        },
      }
    );
  } else {
    await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { applicationStatus: "rejected" } }
      );
  }

  return NextResponse.json({ success: true });
}
