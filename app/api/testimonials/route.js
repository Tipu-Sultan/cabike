import { NextResponse } from 'next/server';
import { Testimonials } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    // Fetch up to 3 testimonials, sorted by most recent
    const testimonials = await Testimonials.find()
      .select('name role image content rating')
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Format response to match static data structure
    const formattedTestimonials = testimonials.map((t) => ({
      id: t._id.toString(),
      name: t.name || 'Anonymous',
      role: t.role || 'User',
      image: t.image || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: t.content || 'No comment provided.',
      rating: t.rating || 1,
    }));

    return NextResponse.json(formattedTestimonials, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}