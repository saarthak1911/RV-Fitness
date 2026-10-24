'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    // Asset preload tracking + smooth counter progression (min ~1.5s per Section 3.3)
    const startTime = performance.now();
    const minDuration = 1600; // ms

    // Preload hero images
    const img1 = new window.Image();
    img1.src = '/images/hero-bodybuilder-clothed.jpg';
    const img2 = new window.Image();
    img2.src = '/images/hero-bodybuilder-shirtless.jpg';

    let currentVal = 0;
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const targetPercent = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      if (currentVal < targetPercent) {
        currentVal += Math.ceil((targetPercent - currentVal) * 0.25) || 1;
        if (currentVal > 100) currentVal = 100;
        setProgress(currentVal);
      }

      if (currentVal >= 100 && elapsed >= minDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
          setTimeout(() => {
            setShouldRender(false);
          }, 800); // Wait for exit animation
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading RV Fitness"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone
          ? prefersReducedMotion
            ? 'opacity-0 pointer-events-none'
            : '-translate-y-full opacity-0 pointer-events-none'
          : 'opacity-100'
      }`}
    >
      {/* Background radial gold glow behind logo */}
      <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-[#FFC62A]/20 via-[#FFC62A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Center RV Logo with draw-in effect */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-500 scale-100">
          <Image
            src="/logo/rv-logo.svg"
            alt="RV Fitness"
            fill
            className="object-contain drop-shadow-[0_0_35px_rgba(255,198,42,0.45)]"
            priority
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white uppercase">
            RV FITNESS
          </h2>
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#FFC62A] uppercase">
            NARSOBAWADI
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-48 sm:w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden mt-2 relative">
          <div
            className="h-full bg-gradient-to-r from-[#FFE072] via-[#FFC62A] to-[#D49A0B] shadow-[0_0_10px_#FFC62A] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Large Semi-transparent 0-100 Counter per Section 3.3 */}
      <div className="absolute bottom-10 sm:bottom-12 font-black text-6xl sm:text-8xl text-white/[0.08] select-none font-mono tracking-tighter">
        {progress.toString().padStart(3, '0')}
      </div>

      <div className="absolute bottom-5 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
        {progress < 100 ? 'PREPARING ARENA...' : 'ENTER ARENA'}
      </div>
    </aside>
  );
}

export default LoadingScreen;
