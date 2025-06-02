import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/db';
import { Purchases } from '@/models/cabike-schemas';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const purchases = await Purchases.find({ userId: session.user.id })
      .populate({
        path: 'vehicleId',
        model: 'CabikeVehicles',
        populate: {
          path: 'VehicleImages',
          model: 'VehicleImages',
          select: 'publicId imageUrl isPrimary',
        },
      })
      .lean();

    const vehicles = purchases.map((p) => p.vehicleId).filter(Boolean);
    return NextResponse.json({ vehicles: vehicles || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch purchases' }, { status: 500 });
  }
}