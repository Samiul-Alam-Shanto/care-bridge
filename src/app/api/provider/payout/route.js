import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Security Check
  if (!session || session.user.role !== "caregiver") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { amount, bankDetails } = await request.json();
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // Create Payout Request
    await db.collection("payouts").insertOne({
      caregiverId: new ObjectId(session.user.id),
      caregiverName: session.user.name,
      amount: Number(amount),
      bankDetails, // { bankName, accountNo }
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Request Failed" }, { status: 500 });
  }
}
