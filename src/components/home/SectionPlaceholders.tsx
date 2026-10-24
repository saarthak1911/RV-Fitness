'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Button from '@/components/ui/Button';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Flame, Dumbbell, Calendar, Heart, Award } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export function SectionPlaceholders() {
  return (
    <div className="space-y-32 py-20">
      {/* 4.2 ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          eyebrow="The RV Lifestyle"
          title="Redefining Fitness In Narsobawadi"
          highlightWord="Narsobawadi"
          description="Built on relentless discipline, state-of-the-art biomechanics gear, and personalized athletic guidance for every fitness level."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard>
            <div className="w-10 h-10 rounded-lg bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] mb-4">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">Premium Gear</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Biomechanical strength machines, competition power racks, and precision Olympic free weights.
            </p>
          </SpotlightCard>

          <SpotlightCard>
            <div className="w-10 h-10 rounded-lg bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">CrossFit & Recovery</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Dedicated functional turf arena, steam bath recovery therapy, and high-intensity conditioning.
            </p>
          </SpotlightCard>

          <SpotlightCard>
            <div className="w-10 h-10 rounded-lg bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">Pro Coaching</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Certified transformation specialists with scientific nutrition and progressive overload programming.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* 4.3 TRAINERS SECTION */}
      <section id="trainers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          eyebrow="Elite Coaches"
          title="Meet Your Transformation Masters"
          highlightWord="Masters"
          description="Full-width trainer roster with specialization, certifications, availability slots, and direct booking."
        />

        <SpotlightCard className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono text-[#FFC62A] uppercase tracking-widest">Stage 3 Integration</span>
              <h3 className="text-xl font-bold uppercase text-white">Full-Width Trainer Rows Ready</h3>
              <p className="text-sm text-zinc-400 max-w-xl">
                Row cards with left-photo, right-bio, star ratings, and the &ldquo;Book Session&rdquo; popup modal linked to the trainer schedule.
              </p>
            </div>
            <a href="#membership">
              <Button variant="primary">View Membership Tiers</Button>
            </a>
          </div>
        </SpotlightCard>
      </section>

      {/* 4.4 EQUIPMENT SECTION */}
      <section id="equipment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          eyebrow="State Of The Art"
          title="Precision Engineered Machinery"
          highlightWord="Machinery"
          description="Category filter tabs (Cardio, Strength, Free Weights, Functional) and 75% screen inspection popups with optional 3D model viewer."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['Cardio Station', 'Free Weight Arena', 'Pin-Loaded Strength', 'Functional Turf'].map((cat) => (
            <SpotlightCard key={cat} className="p-4">
              <span className="text-sm font-bold uppercase text-white">{cat}</span>
              <span className="block text-[10px] text-[#FFC62A] mt-1 font-mono">Stage 3 Grid</span>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4.8 MEMBERSHIP SECTION */}
      <section id="membership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          eyebrow="Select Your Tier Of Excellence"
          title="Membership Tiers"
          highlightWord="Tiers"
          description="Monthly, quarterly, and annual passes with Razorpay test checkout and automated invoice generation."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Bronze Plan', price: '₹2,499', badge: 'Basic Access' },
            { name: 'Silver Plan', price: '₹3,499', badge: 'Core Fitness' },
            { name: 'Gold VIP', price: '₹4,999', badge: 'HIGHLY RECOMMENDED', popular: true },
            { name: 'Titanium Elite', price: '₹14,999', badge: 'All-Inclusive VIP' },
          ].map((tier) => (
            <SpotlightCard
              key={tier.name}
              className={`p-6 flex flex-col justify-between ${
                tier.popular ? 'border-[#FFC62A] shadow-[0_0_25px_rgba(255,198,42,0.25)]' : ''
              }`}
            >
              <div>
                <span className="text-xs font-mono text-[#FFC62A] tracking-wider uppercase block mb-1">
                  {tier.badge}
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-2">{tier.name}</h3>
                <div className="text-3xl font-black text-white my-4">
                  {tier.price} <span className="text-xs text-zinc-500 font-normal">/month</span>
                </div>
              </div>
              <Button variant={tier.popular ? 'primary' : 'secondary'} className="w-full text-xs">
                Choose Plan
              </Button>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4.9 CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          eyebrow="Reach Out"
          title="Get In Touch With RV Fitness"
          highlightWord="Touch"
          description="Visit our facility in Narsobawadi or send an enquiry directly to our management desk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpotlightCard>
            <h4 className="text-sm font-bold uppercase text-[#FFC62A] mb-2">Location</h4>
            <p className="text-sm text-zinc-300">{BRAND.contact.location}</p>
          </SpotlightCard>
          <SpotlightCard>
            <h4 className="text-sm font-bold uppercase text-[#FFC62A] mb-2">Working Hours</h4>
            <p className="text-sm text-zinc-300">{BRAND.contact.hours}</p>
          </SpotlightCard>
          <SpotlightCard>
            <h4 className="text-sm font-bold uppercase text-[#FFC62A] mb-2">Direct Contact</h4>
            <p className="text-sm text-zinc-300">Phone: {BRAND.contact.phone}</p>
            <p className="text-sm text-zinc-400 text-xs mt-1">Email: {BRAND.contact.email}</p>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}

export default SectionPlaceholders;
