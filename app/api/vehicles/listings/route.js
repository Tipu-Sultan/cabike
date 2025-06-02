import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectDB from '@/lib/db';
import { CabikeVehicles, VehicleImages } from '@/models/cabike-schemas';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const vehicles = await CabikeVehicles.find({ seller: session.user.id })
      .populate({
        path: 'photos', // Matches the 'photos' field in CabikeVehiclesSchema
        model: 'VehicleImages',
        select: 'publicId imageUrl isPrimary',
      })
      .lean();

    return NextResponse.json({ vehicles: vehicles || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch listings' }, { status: 500 });
  }
}