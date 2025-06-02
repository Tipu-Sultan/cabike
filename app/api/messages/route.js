import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { CabikeMessages } from '@/models/cabike-schemas';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vehicleId, message } = await request.json();
    if (!vehicleId || !message) {
      return NextResponse.json({ error: 'Vehicle ID and message are required' }, { status: 400 });
    }

    await connectDB();
    const newMessage = new CabikeMessages({
      sender: session.user.id, 
      vehicle: vehicleId,
      message,
      createdAt: new Date(),
    });

    await newMessage.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}