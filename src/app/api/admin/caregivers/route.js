import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("care-bridge");

  // Fetch all caregivers (id and name only)
  const caregivers = await db
    .collection("users")
    .find({ role: "caregiver" })
    .project({ name: 1 })
    .toArray();

  const serialized = caregivers.map((c) => ({
    id: c._id.toString(),
    name: c.name,
  }));

  return NextResponse.json({ caregivers: serialized });
}
