import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

// GET: Fetch User Favorites
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ favorites: [] });
  }

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // We stored userId as a string in session, need ObjectId for DB lookup
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) });

    return NextResponse.json({ favorites: user?.favorites || [] });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST: Toggle Item (Add/Remove)
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { caregiverId } = await request.json();
    const client = await clientPromise;
    const db = client.db("care-bridge");
    const userId = new ObjectId(session.user.id);

    // Check if item exists in favorites array
    const user = await db.collection("users").findOne({ _id: userId });
    const exists = user?.favorites?.includes(caregiverId);

    if (exists) {
      // Remove
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $pull: { favorites: caregiverId } });
    } else {
      // Add
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $addToSet: { favorites: caregiverId } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update wishlist" },
      { status: 500 }
    );
  }
}
