import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { CabikeUsers } from '@/models/cabike-schemas';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await CabikeUsers.findOne({ _id: session.user.id })
      .populate({
        path: 'favorites',
        model: 'CabikeVehicles',
        populate: {
          path: 'photos',
          model: 'VehicleImages',
          select: 'publicId imageUrl isPrimary',
        },
      })
      .lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ vehicles: user.favorites || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vehicleId } = await request.json();
    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    await connectDB();
    const user = await CabikeUsers.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isFavorite = user.favorites.includes(vehicleId);
    if (isFavorite) {
      user.favorites = user.favorites.filter((id) => id.toString() !== vehicleId);
    } else {
      user.favorites.push(vehicleId);
    }

    await user.save();

    return NextResponse.json({ isFavorite: !isFavorite }, { status: 200 });
  } catch (error) {
    console.error('Error updating favorites:', error);
    return NextResponse.json({ error: 'Failed to update favorites' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vehicleId } = await request.json();
    if (!vehicleId) {
      return NextResponse.json({ error: 'No vehicleId provided' }, { status: 400 });
    }

    await connectDB();
    await CabikeUsers.deleteOne({ userId: session.user.id, vehicleId });
    return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}