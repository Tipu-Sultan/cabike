import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';
import { sendVerificationEmail } from '@/utils/email';

export async function POST(request) {
  try {
    await connectDB();
    const { fullName, email, password } = await request.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await CabikeUsers.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Validate password strength (matching RegisterPage logic)
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Password must be at least 8 characters, include an uppercase letter and a number' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '24h' });

    // Create user
    const user = new CabikeUsers({
      username: email.split('@')[0],
      email,
      password: hashedPassword,
      fullName,
      isVerified: false,
      verificationToken,
    });
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${verificationToken}`;
    const emailResult = await sendVerificationEmail(email, fullName, verificationUrl);

    if (!emailResult.success) {
      // Optionally delete the user if email fails to prevent unverified accounts
      await CabikeUsers.deleteOne({ email });
      return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
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