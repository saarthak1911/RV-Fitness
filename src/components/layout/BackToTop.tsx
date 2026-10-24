'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside aria-label="Back to top navigation" className="fixed bottom-6 left-6 z-40">
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 transition-all duration-300 hover:border-[#FFC62A] hover:text-[#FFC62A] hover:shadow-[0_0_20px_rgba(255,198,42,0.3)] hover:-translate-y-1 active:translate-y-0 ${
          isVisible ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-75'
        }`}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </aside>
  );
}

export default BackToTop;
