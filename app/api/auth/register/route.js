import { NextResponse } from 'next/server';

import connectDB from '@/lib/db';

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }


    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}