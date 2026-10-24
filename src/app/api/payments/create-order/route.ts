import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Plan from '@/models/Plan';

export async function POST(request: Request) {
  try {
    const { planId, duration, promoCode } = await request.json();

    await connectToDatabase();

    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Selected plan not found.' }, { status: 404 });
    }

    let baseAmount =
      duration === 'yearly'
        ? plan.yearlyPrice
        : duration === 'quarterly'
        ? plan.quarterlyPrice
        : plan.monthlyPrice;

    // Apply promo code discount
    let discountPercent = 0;
    if (promoCode && (promoCode.toUpperCase() === 'RVFIRST' || promoCode.toUpperCase() === 'NARSOBA20')) {
      discountPercent = 20;
    } else if (promoCode && promoCode.toUpperCase() === 'VIP10') {
      discountPercent = 10;
    }

    const finalAmount = Math.round(baseAmount * (1 - discountPercent / 100));

    // Simulated Razorpay Order Object
    const orderId = `order_rv_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        amount: finalAmount * 100, // in paise
        currency: 'INR',
        planName: plan.name,
        duration,
        finalAmount,
        discountPercent,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Error generating Razorpay order.' },
      { status: 500 }
    );
  }
}
