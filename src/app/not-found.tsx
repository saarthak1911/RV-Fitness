'use client';

import Link from 'next/link';
import { ArrowLeft, Dumbbell, Compass, PhoneCall } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative z-10 max-w-xl mx-auto space-y-8">
        {/* Gym Logo / Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-amber-400/30 text-[#FFC62A] shadow-[0_0_30px_rgba(255,198,42,0.25)] animate-bounce">
          <Dumbbell className="w-10 h-10" />
        </div>

        {/* 404 with Weight Plate Design */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-8xl md:text-9xl font-black text-white tracking-tighter">4</span>
          
          {/* Weight Plate as the Zero */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-8 border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] animate-[spin_12s_linear_infinite]">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#FFC62A] flex items-center justify-center bg-black">
              <span className="text-[10px] md:text-xs font-black text-[#FFC62A]">25 KG</span>
            </div>
          </div>

          <span className="text-8xl md:text-9xl font-black text-white tracking-tighter">4</span>
        </div>

        {/* Gym-style copy */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-black uppercase text-[#FFC62A] tracking-wide">
            Rep Not Found!
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-normal max-w-md mx-auto">
            You lifted too heavy or walked past the gym floor. This page doesn&apos;t exist or has been moved to another rack.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button variant="primary" icon={<ArrowLeft className="w-4 h-4 ml-1" />}>
              Back to Gym Home
            </Button>
          </Link>

          <Link href="/#membership">
            <Button variant="secondary" icon={<Compass className="w-4 h-4" />}>
              Membership Plans
            </Button>
          </Link>

          <Link href="/#contact">
            <Button variant="secondary" icon={<PhoneCall className="w-4 h-4" />}>
              Contact Desk
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
