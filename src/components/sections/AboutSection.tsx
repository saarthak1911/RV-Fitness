'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  Dumbbell,
  Flame,
  Bath,
  Music,
  Users,
  Award,
  ShieldCheck,
  Activity,
  HeartPulse,
  Sparkles,
  Zap,
} from 'lucide-react';

export function AboutSection() {
  const featureTiles = [
    { icon: <Dumbbell className="w-5 h-5" />, title: 'Premium Gear', desc: 'Biomechanical precision machines & Olympic bars' },
    { icon: <Flame className="w-5 h-5" />, title: 'CrossFit Arena', desc: 'Functional sprint turf, sleds & power cages' },
    { icon: <Bath className="w-5 h-5" />, title: 'Steam Bath', desc: 'Therapeutic heat therapy for rapid muscle recovery' },
    { icon: <Music className="w-5 h-5" />, title: 'Zumba & Dance', desc: 'High-energy cardiovascular group conditioning' },
    { icon: <Users className="w-5 h-5" />, title: 'Iron Community', desc: 'Disciplined environment fostering mutual grit' },
    { icon: <Award className="w-5 h-5" />, title: 'Pro Coaches', desc: 'Scientifically certified personal nutrition & lifting' },
  ];

  const whyChooseTall = [
    {
      title: 'Premium Equipment',
      sub: 'Superior Engineering',
      desc: 'Pin-loaded and plate-loaded biomechanical machines calibrated for peak muscle hypertrophy without joint strain.',
      tag: 'Heavy Duty',
    },
    {
      title: 'Steam Bath & Spa',
      sub: 'Ultimate Recovery',
      desc: 'Heated eucalyptus steam session post-workout promotes lymphatic drainage, flushes lactic acid, and relieves muscle soreness.',
      tag: 'Wellness',
    },
    {
      title: 'CrossFit Arena',
      sub: 'Functional Power',
      desc: 'Sprint turf, kettlebells, gymnastic rings, and sled tracks engineered for explosive athletic conditioning.',
      tag: 'Conditioning',
    },
    {
      title: 'Pro Trainers',
      sub: 'Scientific Support',
      desc: 'Expert mentors assessing posture, periodized lifting blocks, and macro-nutrition planning customized to your goals.',
      tag: 'Coaching',
    },
    {
      title: 'Group Classes',
      sub: 'Pure Vitality',
      desc: 'Dynamic group synergy sessions including high-intensity bootcamps, Zumba rhythms, and mobility clinics.',
      tag: 'Community',
    },
  ];

  const whyChooseHorizontal = [
    {
      icon: <HeartPulse className="w-5 h-5 text-[#FFC62A]" />,
      label: 'PERSONAL NUTRITION GUIDANCE',
      title: 'Custom Nutrition Protocols',
      desc: 'Tailored calorie, macro, and hydration plans tailored specifically to your body metabolism and lifestyle.',
    },
    {
      icon: <Activity className="w-5 h-5 text-[#FFC62A]" />,
      label: 'BODY RECOMPOSITION MATRIX',
      title: 'Trackable Milestone Progress',
      desc: 'In-depth body fat assessments, muscle mass metrics, and bi-weekly photographic milestone tracking.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FFC62A]" />,
      label: 'DEDICATED WOMEN\'S FITNESS',
      title: 'Secure & Empowering Space',
      desc: 'Safe, professional, and supportive training environment equipped with female certified trainers and private lockers.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#FFC62A]" />,
      label: 'ELITE TRANSFORM PROGRAMS',
      title: 'Guaranteed Body Recomp',
      desc: 'Proven 12-week & 24-week physique transformation blueprints with documented track records.',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#080808]">
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFC62A]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* ============================================================== */}
        {/* PART 1: INTRO BLOCK & IMAGE COLLAGE                            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Text & 6 Feature Tiles (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeader
              eyebrow="The RV Lifestyle"
              title="Redefining Fitness Standards In Narsobawadi"
              highlightWord="Narsobawadi"
              description="RV Fitness was conceived with a single relentless objective: to deliver world-class gym infrastructure, scientific coaching, and an uncompromising atmosphere of discipline to the fitness enthusiasts of Narsobawadi."
            />

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                Founded under the vision of bringing metropolitan elite athletic standards to Narsobawadi,{' '}
                <strong className="text-[#FFC62A] font-bold">RV Fitness</strong> fuses heavy iron grit with luxury recovery facilities.
              </p>
              <p className="text-zinc-400 text-sm">
                From beginner lifters seeking healthy fat loss to competitive bodybuilders carving podium-ready conditioning, our gym floor provides the biomechanics, coaching integrity, and community drive you need to elevate beyond average.
              </p>
            </div>

            {/* 6 Feature Tiles (3x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {featureTiles.map((tile) => (
                <SpotlightCard key={tile.title} className="p-4 bg-zinc-950/80 border-zinc-800/90">
                  <div className="w-9 h-9 rounded-lg bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] mb-3">
                    {tile.icon}
                  </div>
                  <h4 className="text-sm font-bold uppercase text-white tracking-wide mb-1">
                    {tile.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {tile.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Right Column: 4-Photo Staggered Collage (lg:col-span-5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <Image
                  src="/images/about-crossfit.jpg"
                  alt="RV Fitness CrossFit Arena"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-black uppercase text-[#FFC62A] tracking-wider">CrossFit Arena</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <Image
                  src="/images/about-steambath.jpg"
                  alt="RV Fitness Steam Bath Recovery"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-black uppercase text-[#FFC62A] tracking-wider">Steam Bath & Spa</span>
                </div>
              </div>
            </div>

            {/* Column 2 (Offset lower for staggered feel) */}
            <div className="space-y-4 pt-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <Image
                  src="/images/about-strength.jpg"
                  alt="RV Fitness Strength & Free Weights"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-black uppercase text-[#FFC62A] tracking-wider">Heavy Iron Arena</span>
                </div>
              </div>

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <Image
                  src="/images/about-zumba.jpg"
                  alt="RV Fitness Zumba & Group Studio"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-black uppercase text-[#FFC62A] tracking-wider">Zumba & Dance Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 2: WHY CHOOSE RV FITNESS                                  */}
        {/* ============================================================== */}
        <div className="space-y-12 pt-10">
          <SectionHeader
            eyebrow="Designed For Elite Performance"
            title="Why Choose RV Fitness"
            highlightWord="Choose"
            description="Our training philosophy combines heavy mechanical tension, holistic recovery, and personal coaching to forge lasting physique transformations."
            centered
          />

          {/* Row 1: 5 Tall Cards with circular icon badge & tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyChooseTall.map((card, i) => (
              <SpotlightCard
                key={card.title}
                className="p-6 flex flex-col justify-between h-full bg-zinc-950/70 border-zinc-800"
              >
                <div>
                  <div className="w-11 h-11 rounded-full bg-[#FFC62A]/10 border border-[#FFC62A]/40 flex items-center justify-center text-[#FFC62A] font-black text-sm mb-5 shadow-[0_0_15px_rgba(255,198,42,0.2)]">
                    0{i + 1}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC62A] block mb-1">
                    {card.sub}
                  </span>
                  <h4 className="text-base font-black uppercase text-white tracking-tight mb-3">
                    {card.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-800/80">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {card.tag}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Row 2: 4 Smaller Horizontal Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseHorizontal.map((tile) => (
              <SpotlightCard
                key={tile.title}
                className="p-5 bg-zinc-950/70 border-zinc-800 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex-shrink-0">
                  {tile.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#FFC62A] block uppercase">
                    {tile.label}
                  </span>
                  <h4 className="text-sm font-black uppercase text-white leading-tight">
                    {tile.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                    {tile.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
