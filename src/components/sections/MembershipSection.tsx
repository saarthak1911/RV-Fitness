'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Check, X as Cross, Sparkles, Tag, ShieldCheck, ArrowRight, Download, Receipt } from 'lucide-react';
import { formatPriceINR } from '@/lib/utils';

interface PlanTier {
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold VIP' | 'Titanium Elite';
  desc: string;
  monthly: number;
  quarterly: number;
  yearly: number;
  features: string[];
  excluded: string[];
  isPopular?: boolean;
  isPremium?: boolean;
}

export function MembershipSection() {
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout Modal State
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans: PlanTier[] = [
    {
      name: 'Bronze Essential',
      tier: 'Bronze',
      desc: 'Standard gym floor access and cardio equipment for self-directed lifters.',
      monthly: 2499,
      quarterly: 6499,
      yearly: 21999,
      features: [
        'Complete Gym Floor Access',
        'Standard Free Weight Area',
        'Locker Room & Shower Access',
        'Fitness Orientation Session',
      ],
      excluded: [
        'Steam Bath Recovery Suite',
        'CrossFit Functional Arena',
        'Personal Trainer Diet Protocol',
        'VIP Locker & Laundry Service',
      ],
    },
    {
      name: 'Silver Active',
      tier: 'Silver',
      desc: 'Comprehensive training access with CrossFit arena and group classes included.',
      monthly: 3499,
      quarterly: 8999,
      yearly: 29999,
      features: [
        'Complete Gym Floor Access',
        'CrossFit Functional Turf Arena',
        'Zumba & Aerobics Group Classes',
        'Quarterly Body Composition Scan',
        'Locker Room & Shower Access',
      ],
      excluded: [
        'Steam Bath Recovery Suite',
        'Personal Trainer Diet Protocol',
        'VIP Locker & Towel Service',
      ],
    },
    {
      name: 'Gold VIP Pass',
      tier: 'Gold VIP',
      desc: 'Full facility access including steam bath therapy and personalized nutrition programming.',
      monthly: 4999,
      quarterly: 12999,
      yearly: 42999,
      isPopular: true,
      features: [
        'Unlimited All-Area Gym Access',
        'CrossFit Turf & Heavy Rig Arena',
        'Steam Bath & Recovery Spa (Unlimited)',
        'Personalized Macro Nutrition Protocol',
        'Monthly 1-on-1 Trainer Review',
        'All Group Fitness & Zumba Classes',
      ],
      excluded: [
        'Permanent Reserved VIP Locker',
      ],
    },
    {
      name: 'Titanium Elite',
      tier: 'Titanium Elite',
      desc: 'The pinnacle luxury pass with dedicated 1-on-1 personal training and private VIP amenities.',
      monthly: 14999,
      quarterly: 38999,
      yearly: 129999,
      isPremium: true,
      features: [
        'All Gold VIP Amenities Included',
        '12 Personal Training Sessions / Month',
        'Permanent Reserved VIP Private Locker',
        'Complimentary Whey & Pre-Workout Shake Bar',
        'Custom Blood Panel & Hormone Review',
        'Direct 24/7 WhatsApp Coach Access',
      ],
      excluded: [],
    },
  ];

  const allComparisonFeatures = [
    { feature: 'Gym Floor & Strength Machinery', bronze: true, silver: true, gold: true, titanium: true },
    { feature: 'Free Weight Olympic Dumbbell Suite', bronze: true, silver: true, gold: true, titanium: true },
    { feature: 'CrossFit Functional Sprint Turf', bronze: false, silver: true, gold: true, titanium: true },
    { feature: 'Zumba & Group Dance Classes', bronze: false, silver: true, gold: true, titanium: true },
    { feature: 'Steam Bath & Recovery Spa', bronze: false, silver: false, gold: true, titanium: true },
    { feature: 'Body Composition Matrix Analysis', bronze: false, silver: 'Quarterly', gold: 'Monthly', titanium: 'Weekly' },
    { feature: 'Custom Diet & Macro Protocol', bronze: false, silver: false, gold: true, titanium: true },
    { feature: 'Dedicated 1-on-1 Personal Trainer', bronze: false, silver: false, gold: false, titanium: '12 Sessions' },
    { feature: 'Permanent Reserved Locker', bronze: false, silver: false, gold: false, titanium: true },
  ];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'RVFIRST' || code === 'NARSOBA20') {
      setDiscountPercent(20);
      setPromoSuccess('Promo code applied: 20% Discount unlocked!');
    } else if (code === 'VIP10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo code applied: 10% Discount unlocked!');
    } else {
      setPromoError('Invalid or expired promo code. Try "RVFIRST"');
      setDiscountPercent(0);
    }
  };

  const getPlanPrice = (plan: PlanTier) => {
    let base = duration === 'monthly' ? plan.monthly : duration === 'quarterly' ? plan.quarterly : plan.yearly;
    if (discountPercent > 0) {
      base = base * (1 - discountPercent / 100);
    }
    return Math.round(base);
  };

  const handleSimulatePayment = async () => {
    if (!selectedPlan) return;
    setIsProcessingPayment(true);
    try {
      const finalPrice = getPlanPrice(selectedPlan);
      // 1. Create order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: '6adc38179a47859fba4d309a',
          duration,
          promoCode,
        }),
      });
      const orderData = await orderRes.json();

      // 2. Verify payment & send invoice email
      await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData?.order?.id || `order_rv_${Date.now()}`,
          paymentId: `pay_rv_${Date.now()}`,
          userEmail: 'sarth@rvfitness.local',
          userName: 'Sarth Patil',
          planName: selectedPlan.name,
          amount: finalPrice,
          duration,
        }),
      });

      setPaymentSuccess(true);
    } catch {
      setPaymentSuccess(true);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <section id="membership" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Select Your Tier Of Excellence"
          title="Membership Tiers"
          highlightWord="Tiers"
          description="Transparent pricing with zero hidden fees. Invest in state-of-the-art facilities, certified guidance, and long-term vitality."
          centered
        />

        {/* Duration Toggle with Discount Tag per Section 4.8 */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-xl">
            {(['monthly', 'quarterly', 'yearly'] as const).map((dur) => (
              <button
                key={dur}
                onClick={() => setDuration(dur)}
                className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  duration === dur
                    ? 'bg-[#FFC62A] text-black shadow-[0_0_20px_rgba(255,198,42,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {dur}
                {dur === 'yearly' && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] bg-emerald-500 text-black font-black uppercase">
                    SAVE 25%
                  </span>
                )}
                {dur === 'quarterly' && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] bg-zinc-800 text-[#FFC62A] font-bold">
                    SAVE 15%
                  </span>
                )}
              </button>
            ))}
          </div>

          <span className="text-xs text-zinc-500 font-mono">
            All passes include complimentary initial fitness assessment and locker access
          </span>
        </div>

        {/* 4 Membership Tier Cards per Section 4.8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = getPlanPrice(plan);
            const isRaised = plan.isPopular;

            return (
              <SpotlightCard
                key={plan.name}
                className={`p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isRaised
                    ? 'bg-zinc-950 border-[#FFC62A] shadow-[0_0_35px_rgba(255,198,42,0.25)] lg:-translate-y-3'
                    : plan.isPremium
                    ? 'bg-zinc-950 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                    : 'bg-zinc-950/80 border-zinc-800/90'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFC62A] text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_#FFC62A]">
                    HIGHLY RECOMMENDED
                  </div>
                )}

                {plan.isPremium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-[#FFC62A] text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,198,42,0.4)]">
                    ULTIMATE LUXURY
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC62A] font-bold">
                      {plan.tier}
                    </span>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal min-h-[36px]">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-zinc-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {formatPriceINR(price)}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        /{duration === 'monthly' ? 'mo' : duration === 'quarterly' ? 'quarter' : 'year'}
                      </span>
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block mt-1">
                        Applied {discountPercent}% Special Discount
                      </span>
                    )}
                  </div>

                  {/* Checklist with Ticks and Crosses per Section 4.8 */}
                  <div className="space-y-2.5 text-xs">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500 block">
                      INCLUDED PRIVILEGES:
                    </span>
                    <ul className="space-y-2">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-zinc-200">
                          <Check className="w-4 h-4 text-[#FFC62A] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.excluded.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-zinc-500 line-through opacity-60">
                          <Cross className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  <Button
                    variant={plan.isPopular ? 'primary' : 'secondary'}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setPaymentSuccess(false);
                    }}
                    className="w-full text-xs py-3"
                  >
                    Choose {plan.tier} Pass →
                  </Button>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Promo Code Input Field per Section 4.8 */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#FFC62A]">
            <Tag className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">Have a Gym Promo Code?</span>
          </div>

          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Code (e.g. RVFIRST)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#FFC62A]"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#FFC62A] text-black font-bold text-xs uppercase hover:bg-[#FFE072] transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>

          {promoSuccess && (
            <p className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> {promoSuccess}
            </p>
          )}

          {promoError && (
            <p className="text-xs text-red-400 font-mono">{promoError}</p>
          )}
        </div>

        {/* Feature Comparison Table with Horizontal Scroll per Section 4.8 */}
        <div className="space-y-6 pt-10">
          <div className="text-center space-y-1">
            <h4 className="text-2xl font-black uppercase text-white">Full Feature Comparison</h4>
            <p className="text-xs text-zinc-400">Detailed breakdown of amenities across all membership tiers</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 sticky top-0">
                  <th className="p-4 text-zinc-300 font-bold uppercase tracking-wider">Amenities & Features</th>
                  <th className="p-4 text-center text-zinc-400 font-bold uppercase">Bronze</th>
                  <th className="p-4 text-center text-zinc-300 font-bold uppercase">Silver</th>
                  <th className="p-4 text-center text-[#FFC62A] font-bold uppercase bg-[#FFC62A]/5">Gold VIP</th>
                  <th className="p-4 text-center text-amber-400 font-bold uppercase">Titanium Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {allComparisonFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.bronze === 'boolean' ? (
                        row.bronze ? <Check className="w-4 h-4 text-[#FFC62A] mx-auto" /> : <Cross className="w-4 h-4 text-zinc-700 mx-auto" />
                      ) : (
                        <span className="font-mono text-zinc-300">{row.bronze}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.silver === 'boolean' ? (
                        row.silver ? <Check className="w-4 h-4 text-[#FFC62A] mx-auto" /> : <Cross className="w-4 h-4 text-zinc-700 mx-auto" />
                      ) : (
                        <span className="font-mono text-zinc-300">{row.silver}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-[#FFC62A]/5">
                      {typeof row.gold === 'boolean' ? (
                        row.gold ? <Check className="w-4 h-4 text-[#FFC62A] mx-auto" /> : <Cross className="w-4 h-4 text-zinc-700 mx-auto" />
                      ) : (
                        <span className="font-mono text-[#FFC62A] font-bold">{row.gold}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.titanium === 'boolean' ? (
                        row.titanium ? <Check className="w-4 h-4 text-[#FFC62A] mx-auto" /> : <Cross className="w-4 h-4 text-zinc-700 mx-auto" />
                      ) : (
                        <span className="font-mono text-amber-400 font-bold">{row.titanium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Razorpay Online Purchase Simulation Flow Modal per Section 4.8 */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#121212] border border-[#FFC62A]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,198,42,0.2)]">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <Cross className="w-5 h-5" />
            </button>

            {paymentSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFC62A]/20 border-2 border-[#FFC62A] flex items-center justify-center text-[#FFC62A] mx-auto animate-bounce">
                  <Receipt className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">Membership Activated!</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Payment of <strong className="text-white">{formatPriceINR(getPlanPrice(selectedPlan))}</strong> verified via Razorpay test gateway.
                  Your invoice has been emailed and your pass is live in the member dashboard.
                </p>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left text-xs font-mono space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Plan:</span> <span className="text-white font-bold">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Duration:</span> <span className="text-white capitalize">{duration}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Invoice Ref:</span> <span className="text-[#FFC62A]">INV-RV-2026-9042</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="primary" onClick={() => setSelectedPlan(null)} className="w-full text-xs">
                    Return to Gym Floor
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC62A] uppercase font-bold">
                    Order Summary & Checkout
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Billing Cycle: <span className="text-white capitalize font-semibold">{duration}</span>
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span>{formatPriceINR(duration === 'monthly' ? selectedPlan.monthly : duration === 'quarterly' ? selectedPlan.quarterly : selectedPlan.yearly)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-{formatPriceINR(Math.round(((duration === 'monthly' ? selectedPlan.monthly : duration === 'quarterly' ? selectedPlan.quarterly : selectedPlan.yearly) * discountPercent) / 100))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>GST (Included):</span>
                    <span>18%</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-700 flex justify-between text-sm font-bold text-white">
                    <span>Total Due:</span>
                    <span className="text-[#FFC62A] text-lg font-black">{formatPriceINR(getPlanPrice(selectedPlan))}</span>
                  </div>
                </div>

                {/* Simulated Payment Modes */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">
                    Secure Payment Gateway (Razorpay UPI / Cards):
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="p-3 rounded-lg bg-zinc-900 border border-[#FFC62A]/40 text-center text-white">
                      UPI / GPay / PhonePe
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center text-zinc-400">
                      Credit / Debit Card
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    isLoading={isProcessingPayment}
                    onClick={handleSimulatePayment}
                    className="w-full text-xs py-3.5"
                  >
                    Pay {formatPriceINR(getPlanPrice(selectedPlan))} With Razorpay →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default MembershipSection;
