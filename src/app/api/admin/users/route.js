import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

// GET ALL USERS
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db("care-bridge");

  const users = await db
    .collection("users")
    .find({})
    .project({ password: 0 }) // Hide passwords
    .limit(50)
    .toArray();

  return NextResponse.json({ users });
}

// DELETE USER (Ban)
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const client = await clientPromise;
  const db = client.db("care-bridge");

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}

//  Update User Role
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, role } = await request.json();
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // If making them a caregiver, verify them automatically
    const updates = { role };
    if (role === "caregiver") {
      updates.verified = true;
      updates.applicationStatus = "approved";
    }

    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: updates });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
