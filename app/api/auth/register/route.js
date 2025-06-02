import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}