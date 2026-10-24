'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Trophy, ArrowRight, X, Calendar, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

interface StoryItem {
  id: string;
  name: string;
  initials: string;
  memberSince: string;
  program: string;
  resultBadge: string;
  quote: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  stats: {
    weightChange: string;
    bodyFatReduced: string;
    muscleAdded: string;
  };
  approach: {
    workout: string;
    diet: string;
  };
  trainer: string;
  fullStory: string;
  milestones: { month: string; title: string; desc: string }[];
}

export function TransformationsSection() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  const stories: StoryItem[] = [
    {
      id: 'story-1',
      name: 'Amit Deshmukh',
      initials: 'AD',
      memberSince: 'January 2026',
      program: 'Metabolic Recomposition Protocol',
      resultBadge: '-16 kg Fat Loss',
      quote: 'RV Fitness taught me that discipline is a daily choice. I lost 16kg and gained confidence I never knew existed.',
      beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
      duration: '5 Months (20 Weeks)',
      stats: {
        weightChange: '-16 kg',
        bodyFatReduced: '28% down to 13%',
        muscleAdded: '+3.5 kg Lean Mass',
      },
      approach: {
        workout: '4-day Upper/Lower progressive overload with 15 mins post-workout incline walks.',
        diet: 'Moderate caloric deficit with 1.8g protein per kg bodyweight and high hydration.',
      },
      trainer: 'Vikram Shinde (Head Strength Coach)',
      fullStory: 'Amit arrived at RV Fitness feeling low on energy and struggling with chronic back stiffness. Coach Vikram customized a periodized compound lifting protocol focusing on heavy goblet squats, hip thrusts, and strict dumbbell rows. Within 20 weeks, Amit achieved a shredded 13% body fat while increasing his deadlift from 60kg to 140kg.',
      milestones: [
        { month: 'Month 1', title: 'Habit Foundations', desc: 'Eliminated processed sugars and established 4 workout sessions weekly.' },
        { month: 'Month 3', title: 'Significant Fat Reduction', desc: 'Lost first 9kg; posture and lower back pain completely resolved.' },
        { month: 'Month 5', title: 'Peak Muscular Conditioning', desc: 'Visible six-pack definition and benchmark personal deadlift PR.' },
      ],
    },
    {
      id: 'story-2',
      name: 'Snehal Kadam',
      initials: 'SK',
      memberSince: 'March 2026',
      program: 'Women\'s Hypertrophy & Toning',
      resultBadge: '+4 kg Lean Muscle',
      quote: 'Lifting heavy weights did not make me bulky—it sculpted my physique, cured my lethargy, and made me feel fierce.',
      beforeImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      duration: '4 Months (16 Weeks)',
      stats: {
        weightChange: '-4 kg Net Scale',
        bodyFatReduced: '26% down to 18%',
        muscleAdded: '+4.2 kg Lean Muscle',
      },
      approach: {
        workout: 'Glute-focused hypertrophy 3x weekly + 2 functional HIIT sessions on turf.',
        diet: 'Nutrient-dense whole food nutrition with targeted carbohydrate timing around workouts.',
      },
      trainer: 'Pooja Kulkarni (Functional Coach)',
      fullStory: 'Snehal wanted to build functional athletic tone and posture. Under coach Pooja, she mastered barbell hip thrusts, Romanian deadlifts, and pull-up progressions. Her body recomposition was so dramatic that her posture improved by 3 inches.',
      milestones: [
        { month: 'Month 1', title: 'Movement Mastery', desc: 'Dialed in hip hinge biomechanics and core bracing.' },
        { month: 'Month 2', title: 'Strength Leap', desc: 'Hip thrusting bodyweight for 12 clean reps with zero fatigue.' },
        { month: 'Month 4', title: 'Athletic Definition', desc: 'Noticeable shoulder cap and hamstring curve with vibrant energy.' },
      ],
    },
    {
      id: 'story-3',
      name: 'Omkar Bhosale',
      initials: 'OB',
      memberSince: 'November 2025',
      program: 'Advanced Natural Bodybuilding',
      resultBadge: '+8 kg Muscle Mass',
      quote: 'The coaches at RV Fitness do not guess—they measure, calculate, and push you when you want to quit.',
      beforeImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      duration: '6 Months (24 Weeks)',
      stats: {
        weightChange: '+6 kg Scale Weight',
        bodyFatReduced: 'Maintained at 11%',
        muscleAdded: '+7.8 kg Pure Muscle',
      },
      approach: {
        workout: 'Push/Pull/Legs 5-day split with RPE 9-10 intensity and drop sets on final compounds.',
        diet: 'Clean surplus of 3,200 calories with complex carbs, eggs, and whey supplementation.',
      },
      trainer: 'Rahul Patil (High Intensity Coach)',
      fullStory: 'Omkar had plateaued at 64kg for over a year at other commercial gyms. Moving to RV Fitness allowed him to access commercial plate-loaded machines and a coach who structured progressive tension logs for every session.',
      milestones: [
        { month: 'Month 2', title: 'Plateau Smashed', desc: 'Broke 100kg bench press milestone after 8 weeks of deload and reload cycles.' },
        { month: 'Month 4', title: 'Systemic Hypertrophy', desc: 'Gained 2 inches on arm circumference and broadened chest frame.' },
        { month: 'Month 6', title: 'Stage-Ready Physique', desc: 'Achieved 72kg lean weight with vascularity and dense striations.' },
      ],
    },
  ];

  return (
    <section id="transformations" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header with description on right per Section 4.7 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Our Proof Is In The Results"
            title="Transformation Success"
            highlightWord="Success"
            description="Real members. Real sweat. Real body recomposition documented with unedited progress photos and verified body composition metrics."
            className="mb-0"
          />
          <a href="#membership">
            <Button variant="primary" className="text-xs self-start lg:self-end">
              Start Your Journey →
            </Button>
          </a>
        </div>

        {/* 3-Column Story Cards Grid per Section 4.7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <SpotlightCard
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="p-0 bg-zinc-950/80 border-zinc-800/90 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Split Before/After Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                {/* Left Side: Desaturated Before Photo */}
                <div className="absolute inset-0 w-1/2 overflow-hidden border-r border-[#FFC62A]/40">
                  <Image
                    src={story.beforeImg}
                    alt={`${story.name} Before`}
                    fill
                    className="object-cover grayscale"
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-black uppercase text-zinc-300 border border-zinc-700">
                    BEFORE
                  </div>
                </div>

                {/* Right Side: Full Color After Photo */}
                <div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
                  <Image
                    src={story.afterImg}
                    alt={`${story.name} After`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#FFC62A] text-[10px] font-black uppercase text-black shadow-[0_0_10px_#FFC62A]">
                    AFTER
                  </div>
                </div>
              </div>

              {/* Story Card Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#FFC62A] font-bold">
                    {story.program}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {story.resultBadge}
                  </span>
                </div>

                <blockquote className="text-xs text-zinc-300 italic leading-relaxed line-clamp-2">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                {/* Member Avatar & Since date */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-black text-[#FFC62A]">
                      {story.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{story.name}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">Member since {story.memberSince}</span>
                    </div>
                  </div>

                  <span className="text-xs text-[#FFC62A] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Read Story →
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Full Journey Modal / Overlay per Section 4.7 */}
      {selectedStory && (
        <div
          onClick={() => setSelectedStory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-lg animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121212] border border-[#FFC62A]/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(255,198,42,0.25)] space-y-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="gold">{selectedStory.program}</Badge>
                <span className="text-xs font-mono text-emerald-400 font-bold">{selectedStory.resultBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
                {selectedStory.name}&apos;s Transformation Journey
              </h2>
              <p className="text-xs text-zinc-400">
                Duration: {selectedStory.duration} · Guided by {selectedStory.trainer}
              </p>
            </div>

            {/* Split Media Hero in Modal */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-800 bg-black flex">
              <div className="w-1/2 relative border-r border-[#FFC62A]/30">
                <Image src={selectedStory.beforeImg} alt="Before" fill className="object-cover grayscale" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 text-xs font-black text-white">
                  BEFORE: 28% Body Fat
                </span>
              </div>
              <div className="w-1/2 relative">
                <Image src={selectedStory.afterImg} alt="After" fill className="object-cover" />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded bg-[#FFC62A] text-xs font-black text-black">
                  AFTER: {selectedStory.stats.bodyFatReduced}
                </span>
              </div>
            </div>

            {/* Key Verified Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-2xl font-black text-[#FFC62A] block">{selectedStory.stats.weightChange}</span>
                <span className="text-[10px] uppercase font-bold text-zinc-400">Scale Weight Delta</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-2xl font-black text-emerald-400 block">{selectedStory.stats.bodyFatReduced}</span>
                <span className="text-[10px] uppercase font-bold text-zinc-400">Body Fat Recomp</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-2xl font-black text-white block">{selectedStory.stats.muscleAdded}</span>
                <span className="text-[10px] uppercase font-bold text-zinc-400">Lean Muscle Gained</span>
              </div>
            </div>

            {/* In-depth Journey Narrative */}
            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <h4 className="text-base font-black uppercase text-white">The Journey & Protocols</h4>
              <p>{selectedStory.fullStory}</p>
            </div>

            {/* Timeline Milestones by Month per Section 4.7 */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFC62A]">
                Journey Milestones Timeline
              </h4>
              <div className="space-y-3">
                {selectedStory.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="text-xs font-black font-mono text-[#FFC62A] uppercase flex-shrink-0 w-20">
                      {m.month}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs uppercase text-white">{m.title}</h5>
                      <p className="text-xs text-zinc-400 mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-4">
              <a href="#membership" onClick={() => setSelectedStory(null)}>
                <Button variant="primary">Start Your Transformation →</Button>
              </a>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Close Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TransformationsSection;
