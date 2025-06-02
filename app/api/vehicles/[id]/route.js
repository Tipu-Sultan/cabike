import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/db';
import { CabikeVehicles, VehicleImages,CabikeUsers } from '@/models/cabike-schemas';
import { deleteImage } from '@/utils/cloudinary';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const session = await getServerSession();

    const vehicle = await CabikeVehicles.findById(params.id)
      .populate({
        path: 'photos',
        model: 'VehicleImages',
        select: 'publicId imageUrl isPrimary',
      })
      .populate({
        path: 'seller',
        model: 'CabikeUsers',
        select: 'fullName isVerified createdAt phone',
      })
      .lean();

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Check if vehicle is favorited by the user
    let isFavorite = false;
    if (session && session.user) {
      const user = await CabikeUsers.findOne({ _id: session.user.id }).lean();
      if (user) {
        isFavorite = user.favorites?.includes(params.id) || false;
      }
    }

    const formattedVehicle = {
      id: vehicle._id.toString(),
      title: vehicle.title,
      type: vehicle.type,
      price: vehicle.price,
      description: vehicle.description || '',
      year: vehicle.year,
      mileage: vehicle.mileage,
      location: `${vehicle.location.city}, ${vehicle.location.state}`,
      image: vehicle.photos.find((photo) => photo.isPrimary)?.imageUrl || vehicle.photos[0]?.imageUrl || '',
      fuelType: vehicle.carDetails?.fuelType || null,
      transmission: vehicle.carDetails?.transmission || null,
      engineSize: vehicle.bikeDetails?.engineSize || null,
      bikeType: vehicle.bikeDetails?.bikeType || null,
      carDetails: vehicle.carDetails || null,
      bikeDetails: vehicle.bikeDetails || null,
      listedDate: vehicle.listedDate,
      sellerName: vehicle.seller?.fullName || 'Unknown Seller',
      sellerPhone: vehicle.seller?.phone || null,
      isVerified: vehicle.seller?.isVerified || false,
      photos: vehicle.photos || [],
      sellerMemberSince: vehicle.seller?.createdAt || new Date(),
      isFavorite,
    };

    return NextResponse.json({ vehicle: formattedVehicle }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await connectDB();

    const vehicle = await CabikeVehicles.findOne({ _id: id, userId: session.user.id });
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    // Delete associated images from Cloudinary
    const images = await VehicleImages.find({ vehicleId: id });
    for (const image of images) {
      await deleteImage(image.publicId);
    }

    // Delete images and vehicle from MongoDB
    await VehicleImages.deleteMany({ vehicleId: id });
    await CabikeVehicles.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Vehicle deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}

