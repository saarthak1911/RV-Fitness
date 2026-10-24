import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File exceeds 10MB limit.' }, { status: 400 });
    }

    // Validate mime type (images or videos)
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPEG, PNG, WEBP, and MP4 supported.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully!',
      url: publicUrl,
      fileName: safeName,
      fileSize: file.size,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Upload handler error:', err);
    return NextResponse.json(
      { error: err.message || 'File upload failed.' },
      { status: 500 }
    );
  }
}
