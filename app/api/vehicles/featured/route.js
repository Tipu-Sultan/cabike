import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CabikeVehicles, FeaturedVehicles, CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';


export async function GET(request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    // Get pagination parameters for recent vehicles
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 8; // Match the original limit of 8 recent vehicles
    const skip = (page - 1) * limit;

    // Fetch user favorites if authenticated
    let userFavorites = [];
    if (session?.user?.id) {
      const user = await CabikeUsers.findById(session.user.id, 'favorites').lean();
      if (user?.favorites) {
        userFavorites = user.favorites.map((fav) => fav.toString());
      }
    }

    // Fetch featured vehicles
    const featured = await FeaturedVehicles.find({ featureEndDate: { $gte: new Date() } })
      .populate({
        path: 'vehicleId',
        model: 'CabikeVehicles',
        select: 'title type price year mileage location photos carDetails.fuelType bikeDetails.engineSize listedDate seller',
        populate: [
          {
            path: 'photos',
            model: 'VehicleImages',
            select: 'imageUrl isPrimary',
            match: { $or: [{ isPrimary: true }, { isPrimary: false }] },
          },
          {
            path: 'seller',
            model: 'CabikeUsers',
            select: 'fullName isVerified',
          },
        ],
      })
      .sort({ priority: -1, featureStartDate: -1 })
      .limit(3)
      .lean();

    const featuredVehicles = featured.map((f) => ({
      id: f.vehicleId._id.toString(),
      title: f.vehicleId.title || 'Untitled',
      type: f.vehicleId.type || 'unknown',
      price: f.vehicleId.price || 0,
      year: f.vehicleId.year || null,
      mileage: f.vehicleId.mileage || 0,
      location: `${f.vehicleId.location?.city || 'Unknown'}, ${f.vehicleId.location?.state || 'Unknown'}`,
      image: f.vehicleId.photos?.find((photo) => photo.isPrimary)?.imageUrl || f.vehicleId.photos?.[0]?.imageUrl || '',
      fuelType: f.vehicleId.carDetails?.fuelType || null,
      engineSize: f.vehicleId.bikeDetails?.engineSize || null,
      listedDate: f.vehicleId.listedDate || new Date(),
      sellerName: f.vehicleId.seller?.fullName || 'Unknown Seller',
      isVerified: f.vehicleId.seller?.isVerified || false,
      isFavorite: userFavorites.includes(f.vehicleId._id.toString()),
    }));

    // Fetch recent vehicles
    const recentVehicles = await CabikeVehicles.find()
      .select('title type price year mileage location photos carDetails.fuelType bikeDetails.engineSize listedDate seller')
      .populate({
        path: 'photos',
        model: 'VehicleImages',
        select: 'imageUrl isPrimary',
        match: { $or: [{ isPrimary: true }, { isPrimary: false }] },
      })
      .populate({
        path: 'seller',
        model: 'CabikeUsers',
        select: 'fullName isVerified',
      })
      .sort({ listedDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalVehicles = await CabikeVehicles.countDocuments();

    const formattedRecentVehicles = recentVehicles.map((vehicle) => ({
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
        featuredVehicles,
        recentVehicles: formattedRecentVehicles,
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