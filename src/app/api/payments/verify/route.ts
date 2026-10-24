import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/models/User';
import { sendInvoiceEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, userEmail, userName, planName, amount, duration } = await request.json();

    await connectToDatabase();

    const invoiceNumber = `INV-RV-${Date.now().toString().slice(-6)}`;
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Update user membership if user exists
    if (userEmail) {
      const durationDays = duration === 'yearly' ? 365 : duration === 'quarterly' ? 90 : 30;
      const expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

      await User.findOneAndUpdate(
        { email: userEmail.toLowerCase() },
        {
          'membership.status': 'active',
          'membership.startDate': new Date(),
          'membership.expiryDate': expiryDate,
        }
      );

      // Send confirmation invoice email
      await sendInvoiceEmail(userEmail, userName || 'Valued Athlete', {
        invoiceNumber,
        planName,
        amount,
        duration: duration ? duration.toUpperCase() : 'PASS',
        date: today,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and pass activated successfully!',
      receipt: {
        orderId,
        paymentId: paymentId || `pay_rv_${Date.now()}`,
        invoiceNumber,
        planName,
        amount,
        date: today,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
