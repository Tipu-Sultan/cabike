import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/db';
import { CabikeVehicles, VehicleImages,CabikeUsers } from '@/models/cabike-schemas';
import { deleteImage } from '@/utils/cloudinary';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    const vehicle = await CabikeVehicles.findOne({ vehicleSlug: params.vehicleSlug })
      .populate({
        path: 'photos',
        model: 'VehicleImages',
        select: 'publicId imageUrl isPrimary',
      })
      .populate({
        path: 'seller',
        model: 'CabikeUsers',
        select: 'fullName isVerified createdAt phone username',
      })
      .lean();

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    // Check if vehicle is favorited by the user
    let isFavorite = false;
    if (session?.user?.id) {
      const user = await CabikeUsers.findById(session.user.id).lean();
      if (user) {
        isFavorite = user.favorites?.includes(vehicle._id.toString()) || false;
      }
    }

    const formattedVehicle = {
      id: vehicle._id.toString(),
      vehicleSlug: vehicle.vehicleSlug,
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
      listedDate: vehicle.listedDate ? new Date(vehicle.listedDate).toISOString() : new Date().toISOString(),
      sellerName: vehicle.seller?.fullName || 'Unknown Seller',
      sellerPhone: vehicle.seller?.phone || null,
      isVerified: vehicle.seller?.isVerified || false,
      photos: vehicle.photos || [],
      sellerMemberSince: vehicle.seller?.createdAt ? new Date(vehicle.seller.createdAt).toISOString() : new Date().toISOString(),
      isFavorite,
    };

    return NextResponse.json({ vehicle: formattedVehicle }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vehicle:', error.message);
    return NextResponse.json({ error: `Failed to fetch vehicle: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vehicleSlug } = params;
    const vehicle = await CabikeVehicles.findOne({ vehicleSlug, seller: session.user.id });
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found or you are not authorized to delete it' }, { status: 404 });
    }

    // Delete associated images from Cloudinary and MongoDB
    const images = await VehicleImages.find({ vehicleId: vehicle._id });
    for (const image of images) {
      await deleteImage(image.publicId); // Delete from Cloudinary
    }
    await VehicleImages.deleteMany({ vehicleId: vehicle._id }); // Delete from MongoDB

    // Remove vehicle ID from user's listings and favorites
    await CabikeUsers.updateMany(
      { $or: [{ listings: vehicle._id }, { favorites: vehicle._id }] },
      { $pull: { listings: vehicle._id, favorites: vehicle._id } }
    );

    // Delete the vehicle from MongoDB
    await CabikeVehicles.deleteOne({ _id: vehicle._id });

    return NextResponse.json({ message: 'Vehicle and associated images deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting vehicle:', error.message);
    return NextResponse.json({ error: `Failed to delete vehicle: ${error.message}` }, { status: 500 });
  }
}

