import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

// GET: Fetch the latest user profile details (Real-time DB data)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      user: {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        image: user.image || "",
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}

// PUT: Update profile fields
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, phone, image } = body;

    // Validation (Basic)
    if (!name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("care-bridge");

    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          name,
          phone,
          image,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update Failed" }, { status: 500 });
  }
}
