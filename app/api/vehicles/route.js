import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { CabikeUsers, CabikeVehicles, VehicleImages } from "@/models/cabike-schemas";
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      vehicleType,
      title,
      price,
      year,
      make,
      model,
      mileage,
      location,
      description,
      fuelType,
      transmission,
      bodyType,
      engineSize,
      bikeType,
      photos,
    } = await req.json();

    // Validate required fields
    if (
      !vehicleType ||
      !title ||
      !price ||
      !year ||
      !make ||
      !model ||
      !mileage ||
      !location ||
      !description ||
      (vehicleType === "car" && (!fuelType || !transmission || !bodyType)) ||
      (vehicleType === "bike" && (!engineSize || !bikeType))
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Parse location
    const [city, state] = location.split(",").map((s) => s.trim());

    // Create vehicle
    const vehicle = new CabikeVehicles({
      title,
      type: vehicleType,
      price: Number(price),
      year: Number(year),
      make,
      model,
      mileage: Number(mileage),
      location: { city, state, country: "IN" },
      description,
      seller: session.user.id,
      carDetails:
        vehicleType === "car" ? { fuelType, transmission, bodyType } : null,
      bikeDetails:
        vehicleType === "bike"
          ? { engineSize: Number(engineSize), bikeType }
          : null,
      photos: [], // Initialize photos array
    });

    // Save images and store their IDs
    const imageDocs = await Promise.all(
      photos.map(async (photo, index) => {
        const imageDoc = new VehicleImages({
          vehicleId: vehicle._id,
          publicId: photo.publicId,
          imageUrl: photo.imageUrl,
          isPrimary: index === 0,
        });
        await imageDoc.save();
        return imageDoc._id; // Return the _id of the saved image
      })
    );

    // Update vehicle's photos array with image IDs
    vehicle.photos = imageDocs;
    await vehicle.save();

    // Update user's listings
    await CabikeUsers.findByIdAndUpdate(session.user.id, {
      $push: { listings: vehicle._id },
    });

    return NextResponse.json(
      { message: "Vehicle listing created successfully", vehicleId: vehicle._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vehicle creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    // Get pagination parameters from query
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10; // 10 results per page
    const skip = (page - 1) * limit;

    // Fetch vehicles with only required fields
    const vehicles = await CabikeVehicles.find()
      .select('title type price year mileage location photos carDetails.fuelType bikeDetails.engineSize listedDate seller')
      .populate({
        path: 'photos',
        model: 'VehicleImages',
        select: 'imageUrl isPrimary',
        match: { $or: [{ isPrimary: true }, { isPrimary: false }] }, // Optimize to get primary or first photo
      })
      .populate({
        path: 'seller',
        model: 'CabikeUsers',
        select: 'fullName isVerified',
      })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalVehicles = await CabikeVehicles.countDocuments();

    // Fetch user favorites if authenticated
    let userFavorites = [];
    if (session?.user?.id) {
      const user = await CabikeUsers.findById(session.user.id, 'favorites').lean();
      if (user?.favorites) {
        userFavorites = user.favorites.map((fav) => fav.toString());
      }
    }

    // Format response
    const formattedVehicles = vehicles.map((vehicle) => ({
      id: vehicle._id.toString(),
      title: vehicle.title || 'Untitled',
      type: vehicle.type || 'unknown',
      price: vehicle.price || 0,
      year: vehicle.year || null,
      mileage: vehicle.mileage || 0,
      location: `${vehicle.location?.city || 'Unknown'}, ${vehicle.location?.state || 'Unknown'}`,
      image: vehicle.photos?.find((photo) => photo.isPrimary)?.imageUrl || vehicle.photos?.[0]?.imageUrl || '',
      fuelType: vehicle.carDetails?.fuelType || null,
      engineSize: vehicle.bikeDetails?.engineSize || null,
      listedDate: vehicle.listedDate || new Date(),
      sellerName: vehicle.seller?.fullName || 'Unknown Seller',
      isVerified: vehicle.seller?.isVerified || false,
      isFavorite: userFavorites.includes(vehicle._id.toString()),
    }));

    return NextResponse.json(
      {
        vehicles: formattedVehicles,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalVehicles / limit),
          totalVehicles,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}