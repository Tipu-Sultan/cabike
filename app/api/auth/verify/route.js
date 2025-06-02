import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Invalid verification token' }, { status: 400 });
    }

    // Verify token
    const { email } = jwt.verify(token, process.env.NEXTAUTH_SECRET);

  

    // Update user verification status
    const user = await CabikeUsers.findOneAndUpdate(
      { email, verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: true }
    );

    console.log('User after verification:', user);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
    }

    // Redirect to login page with success message
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?verified=true`);
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
  }
}