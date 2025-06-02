import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { CabikeUsers } from '@/models/cabike-schemas';

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate password strength (matching RegisterPage logic)
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters, include an uppercase letter and a number' }, { status: 400 });
    }

    // Create user
    const user = new CabikeUsers({
      username: email.split('@')[0],
      email,
      password: hashedPassword,
      fullName,
      isVerified: false,
      verificationToken:'dsdfjffdsfsd',
    });
    await user.save();


   

    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}