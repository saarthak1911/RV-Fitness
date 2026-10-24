'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, BRAND } from '@/lib/constants';

interface NavbarProps {
  showLogoInNavbar?: boolean;
}

export function Navbar({ showLogoInNavbar = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#080808]/80 to-transparent border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Gym Name (Fades in smoothly as user scrolls) */}
            <Link
              href="#home"
              className={`flex items-center gap-3 group transition-all duration-300 ${
                showLogoInNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/rv-logo.svg"
                  alt="RV Fitness Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-wider text-white uppercase group-hover:text-[#FFC62A] transition-colors leading-tight">
                  RV FITNESS
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#FFC62A] leading-tight">
                  NARSOBAWADI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation: EXACTLY the 6 links required */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-1 text-xs uppercase font-bold tracking-widest transition-all duration-200 ${
                      isActive ? 'text-[#FFC62A]' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFC62A] shadow-[0_0_8px_#FFC62A] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Login text link and yellow Join Now pill button */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/login"
                className="text-xs uppercase font-bold tracking-wider text-zinc-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link href="#membership" className="btn-primary text-xs py-2 px-5">
                Join Now <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/80 border border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#FFC62A]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Full-screen Overlay per Section 3.2 */}
      <div
        className={`fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between p-8 transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        {/* Header inside mobile menu */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo/rv-logo.svg" alt="RV Fitness" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-sm tracking-wider text-white uppercase">RV FITNESS</p>
              <p className="text-[9px] font-bold tracking-widest text-[#FFC62A]">NARSOBAWADI</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-[#FFC62A]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Staggered Links */}
        <div className="flex flex-col gap-6 my-auto py-6">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-2xl font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-between ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[#FFC62A] translate-x-2'
                  : 'text-zinc-400 hover:text-white hover:translate-x-2'
              }`}
            >
              <span>{link.name}</span>
              <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer Actions */}
        <div className="border-t border-zinc-800 pt-6 space-y-4">
          <Link
            href="#membership"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary w-full text-center py-3.5 text-sm"
          >
            Join Now
          </Link>
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FFC62A] font-bold uppercase tracking-wider"
            >
              Member Login →
            </Link>
            <span>{BRAND.contact.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
