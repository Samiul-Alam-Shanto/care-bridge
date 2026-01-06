import clientPromise from "@/lib/db";

const ITEMS_PER_PAGE = 6;

export async function getAllServices({
  search,
  category,
  minPrice,
  maxPrice,
  page = 1,
}) {
  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price_hourly = {};
      if (minPrice) query.price_hourly.$gte = Number(minPrice);
      if (maxPrice) query.price_hourly.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * ITEMS_PER_PAGE;

    const [services, totalCount] = await Promise.all([
      db
        .collection("services")
        .find(query)
        .skip(skip)
        .limit(ITEMS_PER_PAGE)
        .toArray(),
      db.collection("services").countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const serializedServices = services.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }));

    return {
      services: serializedServices,
      totalPages,
      currentPage: Number(page),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { services: [], totalPages: 0, currentPage: 1 };
  }
}

export async function getServiceBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");
    const service = await db.collection("services").findOne({ slug });
    return service ? { ...service, _id: service._id.toString() } : null;
  } catch (error) {
    return null;
  }
}

export async function getCaregiversBySkill(skillSlug) {
  try {
    const client = await clientPromise;
    const db = client.db("care-bridge");
    const caregivers = await db
      .collection("users")
      .find({
        role: "caregiver",
        skills: { $in: [skillSlug] },
      })
      .toArray();
    return caregivers.map((user) => ({
      ...user,
      _id: user._id.toString(),
      password: null,
    }));
  } catch (error) {
    return [];
  }
}
