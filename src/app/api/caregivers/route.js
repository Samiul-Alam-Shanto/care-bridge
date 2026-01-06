import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured"); // If "true", get random

    const client = await clientPromise;
    const db = client.db("care-bridge");

    let caregivers;

    if (featured === "true") {
      // Get 4 Random Caregivers for Homepage
      caregivers = await db
        .collection("users")
        .aggregate([
          { $match: { role: "caregiver", verified: true } },
          { $sample: { size: 4 } }, // MongoDB Randomizer
        ])
        .toArray();
    } else {
      // Get All (Limit 50 for now)
      caregivers = await db
        .collection("users")
        .find({ role: "caregiver", verified: true })
        .project({ password: 0 }) // Exclude password
        .limit(50)
        .toArray();
    }

    const serialized = caregivers.map((c) => ({
      ...c,
      _id: c._id.toString(),
    }));

    return NextResponse.json({ caregivers: serialized });
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
