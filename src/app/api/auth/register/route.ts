import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const userRole = role && ['admin', 'trainer', 'member'].includes(role) ? role : 'member';

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: userRole,
    });

    const token = signToken({
      id: String(newUser._id),
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Account registered successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('rv_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: err.message || 'Server error during registration.' },
      { status: 500 }
    );
  }
}
