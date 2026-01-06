import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 1. Get User's Favorite IDs
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(session.user.id) },
        { projection: { favorites: 1 } }
      );

    if (!user || !user.favorites || user.favorites.length === 0) {
      return NextResponse.json({ caregivers: [] });
    }

    // 2. Convert string IDs to ObjectIds
    const favoriteIds = user.favorites.map((id) => new ObjectId(id));

    // 3. Fetch Full Caregiver Details
    const caregivers = await db
      .collection("users")
      .find({
        _id: { $in: favoriteIds },
      })
      .project({
        password: 0, // Exclude sensitive data
      })
      .toArray();

    // 4. Serialize _id
    const serialized = caregivers.map((c) => ({
      ...c,
      _id: c._id.toString(),
    }));

    return NextResponse.json({ caregivers: serialized });
  } catch (error) {
    console.error("Wishlist Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
