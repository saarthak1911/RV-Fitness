'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Mouse, Sparkles, Flame, Users, Trophy, Dumbbell } from 'lucide-react';
import Button from '@/components/ui/Button';

interface HomeHeroProps {
  onScrollProgress?: (scrollY: number) => void;
}

export function HomeHero({ onScrollProgress }: HomeHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the shrinking gym wordmark (Section 4.1)
  const [scrollY, setScrollY] = useState(0);

  // Fluid ink blob cursor tracking
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchRevealed, setTouchRevealed] = useState(false);

  // Fluid blob animation coordinates
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const [blobStyle, setBlobStyle] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    // Detect touch capability
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      onScrollProgress?.(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollProgress]);

  // Smooth RAF loop for the fluid organic ink-like blob cursor
  useEffect(() => {
    let animId: number;

    const updateBlob = () => {
      // Lerp positions for organic smooth trailing motion
      const lerp = 0.14;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      // Smooth radius expansion / shrinking
      const radiusLerp = 0.12;
      currentRadius.current += (targetRadius.current - currentRadius.current) * radiusLerp;

      setBlobStyle({
        x: currentPos.current.x,
        y: currentPos.current.y,
        r: currentRadius.current,
      });

      animId = requestAnimationFrame(updateBlob);
    };

    animId = requestAnimationFrame(updateBlob);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    targetRadius.current = 75; // Refined tight reveal radius in px
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    targetRadius.current = 75;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    targetRadius.current = 0;
    setIsHovering(false);
  };

  // Touch drag or tap fallback per Section 4.1
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !e.touches[0]) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
    targetRadius.current = 75;
    setIsHovering(true);
  };

  const toggleTouchReveal = () => {
    setTouchRevealed((prev) => {
      const next = !prev;
      if (next) {
        if (imageContainerRef.current) {
          const rect = imageContainerRef.current.getBoundingClientRect();
          targetPos.current = { x: rect.width / 2, y: rect.height / 2 };
          targetRadius.current = 100;
        }
      } else {
        targetRadius.current = 0;
      }
      return next;
    });
  };

  // Wordmark scroll calculation (shrinks and settles toward top-left)
  // At scroll 0: scale 1, opacity 1
  // At scroll 180: scale 0.7, settles
  const wordmarkProgress = Math.min(1, scrollY / 160);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#080808]"
    >
      {/* SVG Filter for Fluid Wobbly Organic Ink Edge per Vortex Reference */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="fluid-wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id="ink-blob-clip" clipPathUnits="userSpaceOnUse">
            <circle
              cx={blobStyle.x}
              cy={blobStyle.y}
              r={Math.max(0, blobStyle.r)}
              filter="url(#fluid-wobble)"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFC62A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-[#FFC62A]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Dynamic Gym Name Wordmark (Section 4.1) */}
        {/* Visible here at top of hero, shrinks as user scrolls */}
        <div
          className="transition-all duration-150 ease-out origin-left mb-6"
          style={{
            opacity: Math.max(0, 1 - wordmarkProgress * 1.3),
            transform: `translateY(${wordmarkProgress * -20}px) scale(${1 - wordmarkProgress * 0.15})`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/logo/rv-logo.svg"
                alt="RV Fitness"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,198,42,0.4)]"
                priority
              />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase block leading-none">
                RV FITNESS
              </span>
              <span className="text-xs font-black tracking-[0.3em] text-[#FFC62A] block mt-1">
                NARSOBAWADI
              </span>
            </div>
          </div>
        </div>

        {/* SPLIT HERO: Left Text/Buttons, Right Bodybuilder Image (NO OVERLAP per Section 4.1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: All Text & Actions (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            {/* Outlined Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 border border-[#FFC62A]/40 text-[#FFC62A] text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,198,42,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FFC62A] animate-pulse" />
              <span>RV FITNESS · NARSOBAWADI</span>
            </div>

            {/* Main Headline: BUILD YOUR (white), STRENGTH. (yellow), DEFINE YOURSELF. (white) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[1.02] text-white">
              BUILD YOUR <br />
              <span className="text-[#FFC62A] drop-shadow-[0_0_35px_rgba(255,198,42,0.4)]">
                STRENGTH.
              </span>{' '}
              <br />
              DEFINE YOURSELF.
            </h1>

            {/* Subtext per Section 4.1 */}
            <p className="text-lg sm:text-xl text-zinc-300 font-normal max-w-xl leading-relaxed">
              Train with purpose. Transform with discipline.
            </p>

            {/* Buttons: yellow JOIN NOW → and outlined EXPLORE RV FITNESS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="#membership">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4 ml-1" />}>
                  Join Now →
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="secondary">
                  Explore RV Fitness
                </Button>
              </Link>
            </div>

            {/* Animated Counters for Key Stats (Assumption per Section 4.1) */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800/80 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">1,500+</span>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#FFC62A]">Active Members</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">12+</span>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#FFC62A]">Pro Coaches</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">8+</span>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#FFC62A]">Years Legacy</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bodybuilder with Cursor Ink Reveal (lg:col-span-5) */}
          <div className="lg:col-span-5 relative w-full h-[540px] sm:h-[640px] lg:h-[760px] flex items-end justify-center select-none">
            {/* Ambient Backlight Glow behind athlete */}
            <div className="absolute inset-0 bg-radial from-[#FFC62A]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Reveal Interactive Container - fills right half naturally without box */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              className="relative w-full h-full cursor-crosshair [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
            >
              {/* 1. BASE IMAGE: Clothed Bodybuilder (Naturally fitted without stretching) */}
              <Image
                src="/images/hero-bodybuilder-clothed.jpg"
                alt="RV Fitness Athlete Clothed"
                fill
                priority
                className="object-contain object-bottom pointer-events-none"
              />

              {/* 2. REVEALED LAYER: Shirtless Bodybuilder masked by Fluid Organic Ink Blob */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  clipPath: 'url(#ink-blob-clip)',
                  WebkitClipPath: 'url(#ink-blob-clip)',
                  opacity: blobStyle.r > 2 ? 1 : 0,
                }}
              >
                <Image
                  src="/images/hero-bodybuilder-shirtless.jpg"
                  alt="RV Fitness Athlete Physique Revealed"
                  fill
                  priority
                  className="object-contain object-bottom pointer-events-none"
                />
              </div>

              {/* Interactive Prompt Chip */}
              <div
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 ${
                  isHovering || touchRevealed ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#FFC62A]/40 text-[#FFC62A] text-[11px] font-bold tracking-wider uppercase shadow-2xl whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Hover To Reveal Physique</span>
                </div>
              </div>

              {/* Touch Device Toggle Helper (Section 4.1 touch fallback) */}
              {isTouchDevice && (
                <button
                  onClick={toggleTouchReveal}
                  className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/75 backdrop-blur-md border border-[#FFC62A]/50 text-[#FFC62A] text-xs font-bold pointer-events-auto"
                  aria-label="Toggle Physique Reveal"
                >
                  <Flame className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Scroll Indicator per Section 4.1 */}
      <div className="w-full flex flex-col items-center justify-center pt-8 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-[#FFC62A] transition-colors group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">SCROLL</span>
          <div className="w-5 h-8 rounded-full border-2 border-zinc-600 group-hover:border-[#FFC62A] flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 bg-[#FFC62A] rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default HomeHero;
