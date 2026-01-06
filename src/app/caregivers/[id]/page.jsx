import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import CaregiverProfileClient from "@/components/caregivers/CaregiverProfileClient"; // We make the UI client-side
import { notFound } from "next/navigation";

// Server Fetcher
async function getCaregiver(id) {
  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id), role: "caregiver" });
    if (!user) return null;
    return { ...user, _id: user._id.toString() };
  } catch (e) {
    return null;
  }
}

export default async function ProfilePage(props) {
  const params = await props.params;
  const caregiver = await getCaregiver(params.id);

  if (!caregiver) return notFound();

  return <CaregiverProfileClient caregiver={caregiver} />;
}
