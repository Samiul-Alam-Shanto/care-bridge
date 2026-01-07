import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import Stripe from "stripe";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { paymentIntentId, bookingData } = await request.json();

    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 1. FIRST CHECK: Does booking already exist?
    const existingBooking = await db
      .collection("bookings")
      .findOne({ paymentId: paymentIntentId });

    if (existingBooking) {
      return NextResponse.json({
        success: true,
        message: "Booking already exists",
        bookingId: existingBooking._id,
      });
    }

    // 2. If NOT exists, we MUST have bookingData
    if (!bookingData) {
      return NextResponse.json(
        { error: "Missing booking data" },
        { status: 400 }
      );
    }

    // 3. Verify Stripe Status & Get Real Amount
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }

    // --- SECURE CHANGE START ---
    // Get actual amount paid from Stripe (in cents), convert to standard currency
    const amountPaid = paymentIntent.amount / 100;
    // --- SECURE CHANGE END ---

    // 4. Create New Booking
    const newBooking = {
      userId: new ObjectId(session.user.id),
      caregiverId: new ObjectId(bookingData.caregiverId),
      serviceId: new ObjectId(bookingData.serviceId),

      // Details
      serviceTitle: bookingData.serviceTitle,
      caregiverName: bookingData.caregiverName,
      caregiverImage: bookingData.caregiverImage,

      // Logistics
      location: bookingData.location,
      startDate: new Date(bookingData.startDate),
      endDate: new Date(bookingData.endDate),
      totalDays: bookingData.totalDays,

      // SECURE CHANGE: Use amount from Stripe, not localStorage
      totalCost: amountPaid,

      // Operational State
      status: "pending_approval",
      paymentStatus: "paid",
      paymentId: paymentIntentId,

      // Logs
      lifecycle: [
        {
          stage: "paid",
          timestamp: new Date(),
          message: `Payment of ${amountPaid} received via Stripe`,
        },
        {
          stage: "pending_approval",
          timestamp: new Date(),
          message: "Waiting for caregiver acceptance",
        },
      ],

      createdAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(newBooking);

    // 5. Clear User's Cart in DB
    await db.collection("carts").deleteOne({ userId: session.user.id });

    return NextResponse.json({ success: true, bookingId: result.insertedId });
  } catch (error) {
    console.error("Booking Creation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
