import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";

// GET: Fetch Cart from DB
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ items: [] });
  }

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // Find cart by User ID (stored as string in session.user.id)
    const cart = await db
      .collection("carts")
      .findOne({ userId: session.user.id });

    return NextResponse.json({ items: cart?.items || [] });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST: Sync or Update Cart
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items } = body; // Array of cart items

    const client = await clientPromise;
    const db = client.db("care-bridge");

    // Upsert: Create if not exists, Update if exists
    await db.collection("carts").updateOne(
      { userId: session.user.id },
      {
        $set: {
          items: items,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
