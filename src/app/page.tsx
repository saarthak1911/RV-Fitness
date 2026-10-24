'use client';

import React, { useState } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import HomeHero from '@/components/home/HomeHero';
import AboutSection from '@/components/sections/AboutSection';
import TrainersSection from '@/components/sections/TrainersSection';
import EquipmentSection from '@/components/sections/EquipmentSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import TransformationsSection from '@/components/sections/TransformationsSection';
import MembershipSection from '@/components/sections/MembershipSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import BackToTop from '@/components/layout/BackToTop';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  // Logo transition synchronization per Section 3.2 & 4.1:
  // When scroll > 120, hero wordmark has shrunk and settled, revealing navbar logo without duplicate appearance.
  const showLogoInNavbar = scrollY > 120;

  return (
    <main className="relative min-h-screen bg-[#080808] text-white selection:bg-[#FFC62A] selection:text-black">
      {/* 1. Full-screen 0-100 Loading Reveal (Section 3.3) */}
      <LoadingScreen />

      {/* 2. Top Navigation Bar (Section 3.2) */}
      <Navbar showLogoInNavbar={showLogoInNavbar} />

      {/* 3. Split Home Hero Section with Fluid Ink Reveal (Section 4.1) */}
      <HomeHero onScrollProgress={(pos) => setScrollY(pos)} />

      {/* 4. About Section: Intro & Why Choose (Section 4.2) */}
      <AboutSection />

      {/* 5. Trainers Section: Full-Width Rows & Session Booking (Section 4.3) */}
      <TrainersSection />

      {/* 6. Equipment Section: Filters & 75% Modal with 3D Viewer (Section 4.4) */}
      <EquipmentSection />

      {/* 7. Events Section: Countdown, Views & Registration (Section 4.5) */}
      <EventsSection />

      {/* 8. Gallery Section: Social Feed, Double-Tap Like & Lightbox (Section 4.6) */}
      <GallerySection />

      {/* 9. Transformation Success Section: Split Badges & Milestones (Section 4.7) */}
      <TransformationsSection />

      {/* 10. Membership Section: 4 Tiers, Promo Code & Razorpay Flow (Section 4.8) */}
      <MembershipSection />

      {/* 11. Contact Section: Form to MongoDB, Live Hours, Map (Section 4.9) */}
      <ContactSection />

      {/* 12. Footer */}
      <Footer />

      {/* Floating Interactive Elements (Section 3.7) */}
      <FloatingWhatsApp />
      <BackToTop />
    </main>
  );
}
