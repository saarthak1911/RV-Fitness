import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, interest, message } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields (name, phone, email, message).' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const enquiry = await Enquiry.create({
      name,
      phone,
      email,
      interest: interest || 'membership',
      message,
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully! The RV Fitness team will connect with you.',
      id: enquiry._id,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Failed to save enquiry:', err);
    return NextResponse.json(
      { error: err.message || 'Server error saving enquiry.' },
      { status: 500 }
    );
  }
}
