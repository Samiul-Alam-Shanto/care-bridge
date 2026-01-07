import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { differenceInCalendarDays } from "date-fns";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookingData } = body; // Note: We IGNORE body.amount now

    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 1. Fetch REAL Price from Database
    const caregiver = await db.collection("users").findOne({
      _id: new ObjectId(bookingData.caregiverId),
    });

    if (!caregiver) {
      return NextResponse.json(
        { error: "Caregiver not found" },
        { status: 404 }
      );
    }

    // 2. Recalculate Total Cost Server-Side
    // Assumption: 8 hours per day standard shift
    const HOURS_PER_DAY = 8;
    const days =
      differenceInCalendarDays(
        new Date(bookingData.endDate),
        new Date(bookingData.startDate)
      ) + 1;

    // Safety check for dates
    if (days <= 0) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const totalHours = days * HOURS_PER_DAY;
    const secureTotalCost = totalHours * caregiver.hourly_rate;

    // Validate if the amount meets Stripe minimum (approx 50 BDT)
    if (secureTotalCost < 100) {
      return NextResponse.json({ error: "Amount too low" }, { status: 400 });
    }

    // 3. Create Intent with SECURE Amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: secureTotalCost * 100, // Convert to poisha (cents)
      currency: "bdt",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: session.user.id,
        serviceId: bookingData.serviceId,
        caregiverId: bookingData.caregiverId,
        calculatedDays: days,
        calculatedRate: caregiver.hourly_rate,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      // Optional: Send back the verified amount to update UI if needed
      verifiedAmount: secureTotalCost,
    });
  } catch (error) {
    console.error("Payment Init Error:", error);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
