import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mongooseInstance = await connectToDatabase();
    const isConnected = mongooseInstance.connection.readyState === 1;

    return NextResponse.json({
      status: 'ok',
      service: 'RV Fitness API',
      timestamp: new Date().toISOString(),
      database: {
        status: isConnected ? 'connected' : 'connecting/disconnected',
        readyState: mongooseInstance.connection.readyState,
        host: mongooseInstance.connection.host,
        port: mongooseInstance.connection.port,
        name: mongooseInstance.connection.name,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      {
        status: 'error',
        service: 'RV Fitness API',
        timestamp: new Date().toISOString(),
        database: {
          status: 'failed',
          error: err.message,
        },
      },
      { status: 500 }
    );
  }
}
