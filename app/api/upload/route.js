import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { uploadImage, deleteImage } from '@/utils/cloudinary';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { publicId, imageUrl } = await uploadImage(file);
    return NextResponse.json({ publicId, imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { publicId } = await request.json();
    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 });
    }

    await deleteImage(publicId);
    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}