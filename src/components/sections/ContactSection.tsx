'use client';

import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Button from '@/components/ui/Button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { BRAND } from '@/lib/constants';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'membership',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Weekly hours data with today highlighting per Section 4.9
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday...
    setCurrentDay(day);

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    if (day === 0) {
      // Sunday: 6:00 AM (360) to 1:00 PM (780)
      setIsOpenNow(currentTime >= 360 && currentTime <= 780);
    } else {
      // Mon - Sat: 5:30 AM (330) to 10:00 PM (1320)
      setIsOpenNow(currentTime >= 330 && currentTime <= 1320);
    }
  }, []);

  const weeklySchedule = [
    { day: 'Monday', time: '5:30 AM - 10:00 PM', dayIdx: 1 },
    { day: 'Tuesday', time: '5:30 AM - 10:00 PM', dayIdx: 2 },
    { day: 'Wednesday', time: '5:30 AM - 10:00 PM', dayIdx: 3 },
    { day: 'Thursday', time: '5:30 AM - 10:00 PM', dayIdx: 4 },
    { day: 'Friday', time: '5:30 AM - 10:00 PM', dayIdx: 5 },
    { day: 'Saturday', time: '5:30 AM - 10:00 PM', dayIdx: 6 },
    { day: 'Sunday', time: '6:00 AM - 1:00 PM (Recovery)', dayIdx: 0 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry.');

      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: 'membership',
        message: '',
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: unknown) {
      setSubmitError((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prefilledWhatsapp = encodeURIComponent(
    'Hello RV Fitness Narsobawadi! I am contacting you through the website contact form to enquire about membership.'
  );

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          eyebrow="Connect & Enquire"
          title="Get In Touch With RV Fitness"
          highlightWord="Touch"
          description="Have questions regarding membership passes, private trainer availability, or corporate packages? Reach out to our front desk team."
        />

        {/* 3 Quick Info Tiles per Section 4.9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard className="p-6 bg-zinc-950/80 border-zinc-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC62A] block font-bold">
                LOCATION & ADDRESS
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                {BRAND.contact.location}
              </h4>
              <a
                href="https://maps.google.com/?q=Narsobawadi+Gym"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FFC62A] hover:underline inline-flex items-center gap-1 pt-1"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950/80 border-zinc-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC62A] block font-bold">
                DIRECT DESK CALL
              </span>
              <a
                href={`tel:${BRAND.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="text-base font-bold text-white hover:text-[#FFC62A] transition-colors block"
              >
                {BRAND.contact.phone}
              </a>
              <span className="text-xs text-zinc-400 block">Tap to call from phone</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-zinc-950/80 border-zinc-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFC62A]/10 border border-[#FFC62A]/30 flex items-center justify-center text-[#FFC62A] flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFC62A] block font-bold">
                EMAIL SUPPORT
              </span>
              <a
                href={`mailto:${BRAND.contact.email}`}
                className="text-sm font-bold text-white hover:text-[#FFC62A] transition-colors block"
              >
                {BRAND.contact.email}
              </a>
              <span className="text-xs text-zinc-400 block">Fast 24-hr response rate</span>
            </div>
          </SpotlightCard>
        </div>

        {/* Main Grid: Left Contact Form, Right Working Hours & Map (lg:grid-cols-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-8 bg-zinc-950/90 border-zinc-800 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold tracking-widest text-[#FFC62A] uppercase">
                  Direct Enquiry Inbox
                </span>
                <h3 className="text-2xl font-black uppercase text-white">
                  Send A Message To RV Management
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in your details below and an RV fitness coach will reply with personalized guidance.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white uppercase">Enquiry Saved Successfully!</h4>
                  <p className="text-xs text-zinc-300">
                    Your details have been registered into the admin enquiry system. We will contact you via WhatsApp / Call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                        Your Name *
                      </label>
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
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarth@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                        Area Of Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                      >
                        <option value="membership">Membership Tiers & Passes</option>
                        <option value="trainer">1-on-1 Personal Coaching</option>
                        <option value="free_trial">1-Day Free Facility Trial</option>
                        <option value="other">General / Business Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                      Your Message or Fitness Goal *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your fitness targets, previous gym experience, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-red-400 font-mono">{submitError}</p>
                  )}

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      type="submit"
                      isLoading={isSubmitting}
                      className="w-full text-xs py-3.5"
                    >
                      <Send className="w-4 h-4 mr-1" /> Submit Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* RIGHT: Working Hours (with Live Open/Closed indicator), Map & Socials (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Working Hours Tile per Section 4.9 */}
            <SpotlightCard className="p-6 bg-zinc-950/90 border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FFC62A]" />
                  <h4 className="text-sm font-black uppercase text-white">Working Hours</h4>
                </div>
                {/* Live Open / Closed Status per Section 4.9 */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border">
                  {isOpenNow ? (
                    <span className="flex items-center gap-1 text-emerald-400 border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      OPEN NOW
                    </span>
                  ) : (
                    <span className="text-amber-400">CLOSED (OPENS 5:30 AM)</span>
                  )}
                </div>
              </div>

              {/* Weekly Timings with Today's Row Highlighted per Section 4.9 */}
              <div className="space-y-1.5 text-xs font-mono">
                {weeklySchedule.map((row) => {
                  const isToday = row.dayIdx === currentDay;
                  return (
                    <div
                      key={row.day}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-[#FFC62A]/10 border border-[#FFC62A]/40 text-white font-bold'
                          : 'text-zinc-400'
                      }`}
                    >
                      <span className={isToday ? 'text-[#FFC62A]' : ''}>
                        {row.day} {isToday && '(Today)'}
                      </span>
                      <span>{row.time}</span>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>

            {/* Google Map Embed Pinned to Narsobawadi per Section 4.9 */}
            <SpotlightCard className="p-0 overflow-hidden bg-zinc-950 border-zinc-800">
              <div className="relative aspect-[16/9] w-full bg-zinc-900">
                <iframe
                  title="RV Fitness Narsobawadi Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15291.688371309852!2d74.58288544999999!3d16.63062825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1026027a6c9cf%3A0xc3f8e02dcfab5eb4!2sNarsobawadi%2C%20Maharashtra%20416104!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-bold uppercase">RV Fitness, Narsobawadi</span>
                <a
                  href="https://maps.google.com/?q=Narsobawadi"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FFC62A] font-bold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </SpotlightCard>

            {/* WhatsApp Direct & Social Channels per Section 4.9 */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
              <a
                href={`https://wa.me/${BRAND.contact.whatsapp}?text=${prefilledWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat On WhatsApp
              </a>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Socials:</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-[#FFC62A] hover:border-[#FFC62A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-[#FFC62A] hover:border-[#FFC62A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-[#FFC62A] hover:border-[#FFC62A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
