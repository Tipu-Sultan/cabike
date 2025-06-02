import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';
import { sendVerificationEmail } from '@/utils/email';
import { data } from 'autoprefixer';

export async function POST(request) {
  try {
    const { fullName, email, password } = await request.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }


    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify.',data: { fullName, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}