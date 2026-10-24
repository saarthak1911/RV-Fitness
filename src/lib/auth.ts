import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db/mongodb';
import User, { IUser, UserRole } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'rvfitness_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  // @ts-expect-error jsonwebtoken typing compatibility
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<IUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('rv_token')?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    await connectToDatabase();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch {
    return null;
  }
}
