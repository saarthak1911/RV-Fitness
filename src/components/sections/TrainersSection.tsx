'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Star, Clock, Calendar, CheckCircle2, Award, X, Send } from 'lucide-react';

interface TrainerData {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  certifications: string[];
  days: string;
  slots: string;
  bio: string;
  photoUrl: string;
}

export function TrainersSection() {
  const trainers: TrainerData[] = [
    {
      id: 'trainer-1',
      name: 'Vikram Shinde',
      specialization: 'Head Strength & Bodybuilding Coach',
      experience: '9+ Years Experience',
      rating: 5.0,
      certifications: ['ISSA Certified Elite Trainer', 'Certified Strength Specialist (CSCS)', 'Sports Nutrition Diploma'],
      days: 'Mon - Sat',
      slots: '6:00 AM - 11:30 AM & 5:00 PM - 9:30 PM',
      bio: 'Former state-level natural bodybuilding medalist specializing in hypertrophy periodization, posture biomechanics, and personalized competition preparation. Has mentored over 400 lifters to personal bests.',
      photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'trainer-2',
      name: 'Pooja Kulkarni',
      specialization: 'Functional Mobility & Women\'s Physique',
      experience: '6+ Years Experience',
      rating: 4.9,
      certifications: ['ACE Certified Personal Trainer', 'CrossFit Level 2 Coach', 'Prenatal & Postnatal Fitness'],
      days: 'Mon - Fri',
      slots: '6:30 AM - 10:30 AM & 4:30 PM - 8:00 PM',
      bio: 'Dedicated to empowering members through functional conditioning, sustainable fat reduction, and mobility restoration. Known for motivating group intensity and injury prevention technique.',
      photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'trainer-3',
      name: 'Rahul Patil',
      specialization: 'High Intensity Conditioning & Calisthenics',
      experience: '7+ Years Experience',
      rating: 4.9,
      certifications: ['K11 Academy of Fitness Sciences', 'TRX Suspension Master', 'CPR / First Aid Certified'],
      days: 'Tue - Sun',
      slots: '7:00 AM - 12:00 PM & 5:30 PM - 10:00 PM',
      bio: 'Passionate about athletic explosive power, high-intensity interval conditioning, and bodyweight mastery. Helps athletes break through stubborn training plateaus with scientific progressive overload.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Booking Modal State
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerData | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    slot: 'Morning (7:00 AM - 9:00 AM)',
    goal: 'Muscle Hypertrophy & Strength',
    notes: '',
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setSelectedTrainer(null);
      setBookingSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        date: '',
        slot: 'Morning (7:00 AM - 9:00 AM)',
        goal: 'Muscle Hypertrophy & Strength',
        notes: '',
      });
    }, 2200);
  };

  return (
    <section id="trainers" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          eyebrow="Certified Pro Coaches"
          title="Meet Your Transformation Masters"
          highlightWord="Masters"
          description="Every trainer at RV Fitness is scientifically certified with a proven track record of guiding members to discipline and measurable results."
        />

        {/* Full-width trainer rows (photo left, info right per Section 4.3) */}
        <div className="space-y-8">
          {trainers.map((trainer) => (
            <SpotlightCard
              key={trainer.id}
              className="p-6 md:p-8 bg-zinc-950/80 border-zinc-800/90 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Photo (Consistent on every row per Section 4.3) */}
                <div className="lg:col-span-4 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <Image
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">{trainer.experience}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/75 backdrop-blur-md border border-zinc-700/60">
                    <div className="flex items-center gap-1 text-[#FFC62A]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-black text-white">{trainer.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                      500+ SESSIONS
                    </span>
                  </div>
                </div>

                {/* Right Column: Complete Trainer Info */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FFC62A] uppercase">
                      {trainer.specialization}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {trainer.name}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {trainer.bio}
                  </p>

                  {/* Certifications Badges */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block">
                      Accreditations & Certifications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800"
                        >
                          <Award className="w-3.5 h-3.5 text-[#FFC62A]" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#FFC62A] flex-shrink-0" />
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Available Days</span>
                        <span className="font-semibold">{trainer.days}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FFC62A] flex-shrink-0" />
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Daily Slots</span>
                        <span className="font-semibold">{trainer.slots}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Yellow "Book Session" Pill */}
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      onClick={() => setSelectedTrainer(trainer)}
                      className="text-xs"
                    >
                      Book Session With {trainer.name.split(' ')[0]} →
                    </Button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Booking Modal Popup per Section 4.3 */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#121212] border border-[#FFC62A]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,198,42,0.2)]">
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FFC62A]/20 border border-[#FFC62A] flex items-center justify-center text-[#FFC62A] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">Session Requested!</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Your personal training slot with <strong className="text-white">{selectedTrainer.name}</strong> has been forwarded to the trainer dashboard. We will confirm via WhatsApp / Call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC62A] uppercase">
                    Personal Training Request
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                    Book With {selectedTrainer.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {selectedTrainer.specialization} · {selectedTrainer.slots}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarth Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Time Window</label>
                      <select
                        value={formData.slot}
                        onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                      >
                        <option>Morning (6:30 AM - 9:00 AM)</option>
                        <option>Mid-Day (10:00 AM - 12:00 PM)</option>
                        <option>Evening (5:00 PM - 7:30 PM)</option>
                        <option>Night (8:00 PM - 9:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Primary Fitness Goal</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    >
                      <option>Muscle Hypertrophy & Strength</option>
                      <option>Aggressive Fat Loss & Body Recomp</option>
                      <option>Athletic Conditioning & Endurance</option>
                      <option>Posture Correction & Mobility</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <Button variant="primary" type="submit" className="w-full text-xs py-3">
                    <Send className="w-4 h-4 mr-1" /> Confirm Session Booking
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

export default TrainersSection;
