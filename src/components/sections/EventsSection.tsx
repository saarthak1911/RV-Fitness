'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, Users, X, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  description: string;
  spotsTotal: number;
  spotsLeft: number;
  isPast?: boolean;
}

export function EventsSection() {
  const [viewTab, setViewTab] = useState<'upcoming' | 'past' | 'calendar'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', phone: '', email: '' });

  // Countdown Timer for Featured Event (Days, Hours, Minutes, Seconds) per Section 4.5
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingEvents: EventItem[] = [
    {
      id: 'ev-1',
      title: 'Narsobawadi Heavy Deadlift & Bench Championship',
      category: 'Powerlifting Meet',
      date: 'Nov 15, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'RV Fitness Functional Arena',
      coverImage: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80',
      description: 'The premier annual powerlifting showdown in the region. Sanctioned raw lifting division with calibrated steel plates, referee judging, and cash prizes.',
      spotsTotal: 40,
      spotsLeft: 7,
    },
    {
      id: 'ev-2',
      title: 'CrossFit Sprint & Sled Endurance Gauntlet',
      category: 'Conditioning Challenge',
      date: 'Nov 28, 2026',
      time: '6:30 AM - 11:00 AM',
      location: 'RV Fitness 25m Sprint Turf',
      coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
      description: 'High-octane athletic team challenge testing work capacity, sled pushes, kettlebell snatches, and tactical assault bike pacing.',
      spotsTotal: 30,
      spotsLeft: 12,
    },
  ];

  const pastEvents: EventItem[] = [
    {
      id: 'ev-past-1',
      title: 'Summer 90-Day Physique Transformation Gala',
      category: 'Member Awards',
      date: 'Sep 20, 2026',
      time: '6:00 PM',
      location: 'RV Fitness Main Floor',
      coverImage: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80',
      description: 'Celebrated the victorious members of our 90-day recomp protocol. Trophies awarded for best fat loss, muscle gain, and coach of the year.',
      spotsTotal: 80,
      spotsLeft: 0,
      isPast: true,
    },
    {
      id: 'ev-past-2',
      title: 'Olympic Weightlifting Technique Masterclass',
      category: 'Workshop',
      date: 'Aug 12, 2026',
      time: '10:00 AM',
      location: 'RV Fitness Platform',
      coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
      description: 'Hands-on clean & jerk and snatch biomechanics workshop led by state certified coaches.',
      spotsTotal: 25,
      spotsLeft: 0,
      isPast: true,
    },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setRegisterSuccess(false);
      setRegForm({ name: '', phone: '', email: '' });
    }, 2200);
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Competitions & Workshops"
            title="Events & Showdowns"
            highlightWord="Showdowns"
            description="Push your physical limits, participate in regional championships, and celebrate milestones with the RV community."
            className="mb-0"
          />

          {/* Toggle at top: Upcoming, Past, Calendar view per Section 4.5 */}
          <div className="flex items-center p-1 rounded-full bg-zinc-900 border border-zinc-800 self-start md:self-end">
            {(['upcoming', 'past', 'calendar'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setViewTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewTab === tab
                    ? 'bg-[#FFC62A] text-black shadow-[0_0_15px_rgba(255,198,42,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab === 'calendar' ? 'Calendar View' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: UPCOMING (Includes Featured Hero Countdown Card)       */}
        {/* ============================================================== */}
        {viewTab === 'upcoming' && (
          <div className="space-y-12">
            {/* Featured Event Hero Card with LIVE Countdown Timer (Section 4.5) */}
            <SpotlightCard className="p-0 bg-zinc-950/90 border-[#FFC62A]/40 overflow-hidden shadow-[0_0_40px_rgba(255,198,42,0.15)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left Media (lg:col-span-5) */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto lg:h-full w-full min-h-[320px]">
                  <Image
                    src={upcomingEvents[0].coverImage}
                    alt={upcomingEvents[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">FEATURED SHOWDOWN</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    {upcomingEvents[0].spotsLeft} SPOTS REMAINING
                  </div>
                </div>

                {/* Right Info & Live Countdown (lg:col-span-7) */}
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#FFC62A] uppercase tracking-widest font-bold">
                      {upcomingEvents[0].category} · {upcomingEvents[0].date}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                      {upcomingEvents[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {upcomingEvents[0].description}
                    </p>
                  </div>

                  {/* Live Countdown Timer per Section 4.5 */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block">
                      Registration Countdown:
                    </span>
                    <div className="grid grid-cols-4 gap-3 max-w-sm text-center">
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                        <span className="text-2xl font-black text-[#FFC62A] font-mono block">
                          {timeLeft.days}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Days</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                        <span className="text-2xl font-black text-white font-mono block">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Hours</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                        <span className="text-2xl font-black text-white font-mono block">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Mins</span>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                        <span className="text-2xl font-black text-emerald-400 font-mono block animate-pulse">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Secs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      variant="primary"
                      onClick={() => setSelectedEvent(upcomingEvents[0])}
                      className="text-xs py-3 px-6"
                    >
                      Register Spot Now →
                    </Button>
                    <span className="text-xs text-zinc-400 font-mono">
                      Location: {upcomingEvents[0].location}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Other Upcoming Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(1).map((ev) => (
                <SpotlightCard key={ev.id} className="p-6 bg-zinc-950/80 border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <Image src={ev.coverImage} alt={ev.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="gold">{ev.category}</Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#FFC62A] font-mono">
                        <span>{ev.date} · {ev.time}</span>
                        <span className="text-emerald-400">{ev.spotsLeft} Spots Left</span>
                      </div>
                      <h4 className="text-lg font-black uppercase text-white">{ev.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{ev.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-mono">{ev.location}</span>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedEvent(ev)}
                      className="text-xs py-2 px-4"
                    >
                      Register
                    </Button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: PAST EVENTS (With "View Gallery" links into Gallery)     */}
        {/* ============================================================== */}
        {viewTab === 'past' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((ev) => (
              <SpotlightCard key={ev.id} className="p-6 bg-zinc-950/80 border-zinc-800 space-y-4">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  <Image src={ev.coverImage} alt={ev.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="dark">COMPLETED</Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FFC62A] uppercase">{ev.date}</span>
                  <h4 className="text-lg font-black uppercase text-white">{ev.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ev.description}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Archived Event</span>
                  <a href="#gallery" className="btn-secondary text-xs py-1.5 px-4">
                    View in Gallery →
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: CALENDAR VIEW per Section 4.5                          */}
        {/* ============================================================== */}
        {viewTab === 'calendar' && (
          <SpotlightCard className="p-8 bg-zinc-950/80 border-zinc-800 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h4 className="text-lg font-black uppercase text-white">November 2026 Schedule</h4>
              <span className="text-xs font-mono text-[#FFC62A]">2 Major Events Scheduled</span>
            </div>

            {/* Simple month grid demonstration */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                <div key={d} className="p-2 text-zinc-500 font-bold">{d}</div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isNov15 = day === 15;
                const isNov28 = day === 28;

                return (
                  <div
                    key={day}
                    className={`p-3 rounded-lg border text-xs min-h-[60px] flex flex-col justify-between ${
                      isNov15 || isNov28
                        ? 'border-[#FFC62A] bg-amber-400/10 text-white shadow-[0_0_10px_rgba(255,198,42,0.3)]'
                        : 'border-zinc-800/80 text-zinc-400 bg-zinc-900/40'
                    }`}
                  >
                    <span className="font-bold self-start">{day}</span>
                    {isNov15 && (
                      <span className="text-[9px] font-black uppercase text-[#FFC62A] truncate">
                        Powerlifting Meet
                      </span>
                    )}
                    {isNov28 && (
                      <span className="text-[9px] font-black uppercase text-emerald-400 truncate">
                        Sled Gauntlet
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </SpotlightCard>
        )}
      </div>

      {/* Registration Popup Modal per Section 4.5 */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-[#121212] border border-[#FFC62A]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,198,42,0.2)]">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {registerSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">Spot Reserved!</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Your seat for <strong className="text-white">{selectedEvent.title}</strong> has been secured. Your digital entry pass has been generated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC62A] uppercase">
                    Event Registration
                  </span>
                  <h3 className="text-xl font-black uppercase text-white leading-tight">
                    {selectedEvent.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono pt-1">
                    <span>{selectedEvent.date}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{selectedEvent.spotsLeft} spots available</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarth Patil"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Email (For Event Ticket Pass)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarth@rvfitness.local"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <Button variant="primary" type="submit" className="w-full text-xs py-3">
                    Confirm Free Spot Registration
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default EventsSection;
