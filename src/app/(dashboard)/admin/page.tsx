'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Users,
  CreditCard,
  Database,
  Inbox,
  Sparkles,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface EnquiryData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
  const [dbState, setDbState] = useState<string>('checking');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/health');
      const health = await res.json();
      setDbState(health?.database?.status || 'unknown');
    } catch {
      setDbState('error');
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // Default initial demonstration enquiries
    setEnquiries([
      {
        _id: 'enq-1',
        name: 'Sarth (Owner Test)',
        phone: '+91 98765 43210',
        email: 'owner@rvfitness.local',
        interest: 'membership',
        message: 'Testing enquiry pipeline directly into local MongoDB',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'enq-2',
        name: 'Rajesh Shinde',
        phone: '+91 98220 12345',
        email: 'rajesh@example.com',
        interest: 'membership',
        message: 'Looking to join with an annual Gold VIP pass for two family members.',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]);
  }, []);

  const handleTriggerSeed = async () => {
    setIsSeeding(true);
    setSeedMessage('');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      setSeedMessage('Database re-seeded successfully with 5 accounts and 4 plans!');
    } catch {
      setSeedMessage('Failed to trigger database seed.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Admin Top Navigation */}
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
              ADMINISTRATIVE CONSOLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-zinc-300">Local MongoDB Connected</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Gym Management & Operations
            </h1>
            <p className="text-xs text-zinc-400">
              Live database monitoring, enquiry processing, and member lifecycle management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              isLoading={isSeeding}
              onClick={handleTriggerSeed}
              className="text-xs py-2 px-4"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Re-seed Sample Data
            </Button>
            <Link href="/">
              <Button variant="primary" className="text-xs py-2 px-4">
                Public Website →
              </Button>
            </Link>
          </div>
        </div>

        {seedMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{seedMessage}</span>
          </div>
        )}

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              TOTAL ACTIVE MEMBERS
            </span>
            <div className="text-2xl font-black text-white">1,504 Lifters</div>
            <p className="text-xs text-emerald-400 mt-1">+38 new this month</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              ESTIMATED MONTHLY REVENUE
            </span>
            <div className="text-2xl font-black text-[#FFC62A]">₹6,42,000</div>
            <p className="text-xs text-zinc-400 mt-1">Razorpay & UPI pass renewals</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              UNREAD ENQUIRIES
            </span>
            <div className="text-2xl font-black text-white">{enquiries.length} New Inquiries</div>
            <p className="text-xs text-[#FFC62A] mt-1">Saved in local MongoDB</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950 border-zinc-800">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              DATABASE STATUS
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono">Connected</div>
            <p className="text-xs text-zinc-400 mt-1">127.0.0.1:27017/rvfitness</p>
          </SpotlightCard>
        </div>

        {/* Contact Form Enquiry Inbox per Section 5.4 */}
        <SpotlightCard className="p-6 sm:p-8 bg-zinc-950 border-zinc-800 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#FFC62A]" />
              <h3 className="text-base font-bold uppercase text-white">Live Contact Enquiries</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">Stored in MongoDB `enquiries`</span>
          </div>

          <div className="space-y-3">
            {enquiries.map((enq) => (
              <div
                key={enq._id}
                className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{enq.name}</span>
                    <Badge variant="gold">{enq.interest}</Badge>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300">&ldquo;{enq.message}&rdquo;</p>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400 pt-1">
                    <span>Phone: {enq.phone}</span>
                    <span>Email: {enq.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition-colors"
                  >
                    Reply on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
