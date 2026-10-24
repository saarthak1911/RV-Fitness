'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Users, Calendar, Clock, LogOut, CheckCircle2, MessageSquare, Plus, Check } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function TrainerDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState([
    { id: 'req-1', member: 'Sarth Patil', goal: 'Muscle Hypertrophy & Deadlift PR', slot: 'Today, 6:30 PM', status: 'confirmed' },
    { id: 'req-2', member: 'Rohan Kadam', goal: '16-Week Fat Recomp Protocol', slot: 'Tomorrow, 7:00 AM', status: 'pending' },
    { id: 'req-3', member: 'Amit Deshmukh', goal: 'Upper Body Biomechanics Check', slot: 'Tomorrow, 5:30 PM', status: 'pending' },
  ]);

  const handleConfirm = (id: string) => {
    setRequests((list) =>
      list.map((r) => (r.id === id ? { ...r, status: 'confirmed' } : r))
    );
  };

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
              TRAINER CONSOLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-white">Vikram Shinde</span>
            <span className="text-[10px] text-[#FFC62A] font-mono">Head Coach</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Coach Schedule & Roster
            </h1>
            <p className="text-xs text-zinc-400">
              Manage incoming session requests, assign progressive overload splits, and review member progress.
            </p>
          </div>
          <Link href="/">
            <Button variant="secondary" className="text-xs">
              View Public Website
            </Button>
          </Link>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              ASSIGNED ATHLETES
            </span>
            <div className="text-2xl font-black text-white">14 Members</div>
            <p className="text-xs text-emerald-400 mt-1">All on active protocols</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              TODAY&apos;S SESSIONS
            </span>
            <div className="text-2xl font-black text-white">5 Booked Slots</div>
            <p className="text-xs text-[#FFC62A] mt-1">Next: 6:30 PM (Sarth P.)</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              COACH RATING
            </span>
            <div className="text-2xl font-black text-white">5.0 / 5.0 ★</div>
            <p className="text-xs text-zinc-400 mt-1">Based on 400+ reviews</p>
          </SpotlightCard>
        </div>

        {/* Incoming Session Requests */}
        <SpotlightCard className="p-6 sm:p-8 bg-zinc-950 border-zinc-800 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FFC62A]" />
              <h3 className="text-base font-bold uppercase text-white">Member Booking Queue</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">{requests.length} Requests Active</span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{req.member}</span>
                    {req.status === 'confirmed' ? (
                      <Badge variant="success">Confirmed</Badge>
                    ) : (
                      <Badge variant="gold">Action Required</Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">
                    Goal: <span className="text-zinc-200">{req.goal}</span>
                  </p>
                  <span className="text-[11px] font-mono text-[#FFC62A] block">{req.slot}</span>
                </div>

                {req.status === 'pending' && (
                  <Button
                    variant="primary"
                    onClick={() => handleConfirm(req.id)}
                    className="text-xs py-2 px-4 self-start sm:self-auto"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" /> Accept & Schedule
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
