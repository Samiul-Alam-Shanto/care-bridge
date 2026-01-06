import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { experienceYears, bio, skills, nidUrl } = body;

    const client = await clientPromise;
    const db = client.db("care-bridge");

    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          experienceYears,
          bio,
          skills, // Array of strings e.g. ['elderly', 'baby']
          nidUrl, // Image URL from ImgBB
          applicationStatus: "pending",
          appliedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Application failed" }, { status: 500 });
  }
}
