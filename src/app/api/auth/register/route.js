import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";

export async function POST(request) {
  try {
    // 1. Get the data sent from the frontend
    const body = await request.json();
    const { name, email, phone, nid, password, image } = body;

    // 2. Connect to the database
    const client = await clientPromise;
    const db = client.db("care-bridge");

    // 3. Check if a user with this email ALREADY exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 400 } // 400 means "Bad Request"
      );
    }

    // 4. Secure the password (Hash it so hackers can't read it)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user object
    const newUser = {
      name,
      email,
      phone,
      nid,
      image,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    // 6. Save to MongoDB
    await db.collection("users").insertOne(newUser);

    // 7. Send success message back to frontend
    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
