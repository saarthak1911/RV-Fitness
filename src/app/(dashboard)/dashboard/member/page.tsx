'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dumbbell,
  Calendar,
  Award,
  Clock,
  LogOut,
  CreditCard,
  Activity,
  Flame,
  CheckCircle2,
  TrendingUp,
  FileText,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface UserData {
  name: string;
  email: string;
  role: string;
  membership?: {
    status: string;
    expiryDate: string;
  };
}

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // Default demo fallback for presentation
          setUser({
            name: 'Sarth Patil',
            email: 'sarth@rvfitness.local',
            role: 'member',
            membership: {
              status: 'active',
              expiryDate: '2027-10-24',
            },
          });
        }
      })
      .catch(() => {
        setUser({
          name: 'Sarth Patil',
          email: 'sarth@rvfitness.local',
          role: 'member',
          membership: { status: 'active', expiryDate: '2027-10-24' },
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/logo/rv-logo.svg" alt="RV Fitness" fill className="object-contain" />
          </div>
          <div>
            <span className="font-black text-sm tracking-wider text-white uppercase block leading-none">
              RV FITNESS
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#FFC62A] block mt-0.5">
              MEMBER PORTAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-white">{user?.name}</span>
            <span className="text-[10px] text-[#FFC62A] font-mono capitalize">Active Member</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-[#FFC62A]/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC62A]/10 border border-[#FFC62A]/30 text-[#FFC62A] text-[10px] font-black uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC62A] animate-ping" />
              Arena Pass: Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Welcome Back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
              Next scheduled session: <strong className="text-white">Heavy Pull Routine</strong> with Coach Vikram at 6:30 PM today.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <Link href="/#trainers">
              <Button variant="primary" className="text-xs">
                Book Session →
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" className="text-xs">
                Back To Site
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">MEMBERSHIP PLAN</span>
              <Badge variant="gold">GOLD VIP</Badge>
            </div>
            <div className="text-xl font-black text-white">Annual VIP Pass</div>
            <p className="text-[11px] text-zinc-400 mt-1">Renews Oct 24, 2027</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">ATTENDANCE</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">18 Days Active</div>
            <p className="text-[11px] text-emerald-400 mt-1">Streak: 4 consecutive weeks</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">COACH ASSIGNED</span>
              <Award className="w-4 h-4 text-[#FFC62A]" />
            </div>
            <div className="text-xl font-black text-white">Vikram Shinde</div>
            <p className="text-[11px] text-zinc-400 mt-1">Hypertrophy & Strength</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">RECOMP GOAL</span>
              <TrendingUp className="w-4 h-4 text-[#FFC62A]" />
            </div>
            <div className="text-xl font-black text-white">-6.5 kg Lost</div>
            <p className="text-[11px] text-zinc-400 mt-1">Target: -10 kg (65% Reached)</p>
          </SpotlightCard>
        </div>

        {/* Assigned Workout & Diet Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workout Split */}
          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-[#FFC62A]" />
                <h3 className="text-base font-bold uppercase text-white">Assigned Workout Routine</h3>
              </div>
              <span className="text-[10px] font-mono text-[#FFC62A]">Week 4 of 12</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Day 1: Heavy Incline Dumbbell Press</span>
                  <span className="text-zinc-400 text-[11px]">4 sets × 8-10 reps (RPE 8.5)</span>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Day 2: Deadlifts & Barbell Rows</span>
                  <span className="text-zinc-400 text-[11px]">4 sets × 6-8 reps + Incline Walk</span>
                </div>
                <Badge variant="gold">Today 6:30 PM</Badge>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Day 3: Barbell Squats & Romanian Deadlifts</span>
                  <span className="text-zinc-400 text-[11px]">4 sets × 10 reps (Hypertrophy focus)</span>
                </div>
                <span className="text-zinc-500 font-mono text-[10px]">Tomorrow</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Nutrition Protocol */}
          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold uppercase text-white">Personal Nutrition Blueprint</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">2,350 kcal / day</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-base font-black text-white block">160g</span>
                <span className="text-[10px] text-zinc-500 uppercase">Protein</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-base font-black text-white block">240g</span>
                <span className="text-[10px] text-zinc-500 uppercase">Carbs</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-base font-black text-white block">65g</span>
                <span className="text-[10px] text-zinc-500 uppercase">Fats</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-2">
              Stay hydrated with at least 3.5 liters of water daily. Post-workout whey shake to be consumed within 45 minutes of training.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
