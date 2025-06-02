import { NextResponse } from 'next/server';
import { CabikeUsers } from '@/models/cabike-schemas';
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';

// Get all users or a specific user
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (userId) {
      const user = await CabikeUsers.findById(userId).select('-password -verificationToken');
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }

    const users = await CabikeUsers.find().select('-password -verificationToken');
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create a new user (alternative to /api/auth/register)
export async function POST(request) {
  try {
    await connectDB();
    const { fullName, email, password, username } = await request.json();

    if (!fullName || !email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await CabikeUsers.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new CabikeUsers({
      username,
      email,
      password: hashedPassword,
      fullName,
      isVerified: false,
    });
    await user.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update a user
export async function PUT(request) {
  try {
    await connectDB();
    const { id, fullName, email, password, phone, location } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;

    const user = await CabikeUsers.findByIdAndUpdate(id, updateData, { new: true }).select('-password -verificationToken');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('PUT user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Partially update a user
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await CabikeUsers.findByIdAndUpdate(id, updates, { new: true }).select('-password -verificationToken');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('PATCH user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a user
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await CabikeUsers.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('DELETE user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}