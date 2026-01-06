import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("care-bridge");

    const caregiver = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(id), role: "caregiver" },
        { projection: { password: 0 } }
      );

    if (!caregiver)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json({
      caregiver: { ...caregiver, _id: caregiver._id.toString() },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 500 });
  }
}
