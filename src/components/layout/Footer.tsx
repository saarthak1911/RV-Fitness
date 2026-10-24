'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, ArrowUpRight, Heart } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/logo/rv-logo.svg" alt="RV Fitness" fill className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white uppercase block leading-tight">
                  RV FITNESS
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFC62A] block">
                  NARSOBAWADI
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              The premier 3D fitness center in Narsobawadi. Engineered with heavy iron, biomechanical machinery, steam bath recovery, and scientifically backed coaching.
            </p>

            <div className="text-[11px] font-mono text-zinc-500 space-y-1">
              <p>Location: {BRAND.contact.location}</p>
              <p>Helpline: {BRAND.contact.phone}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-xs">Navigation</h5>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FFC62A] transition-colors flex items-center gap-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Arena Facilities */}
          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-xs">Facilities</h5>
            <ul className="space-y-2 text-zinc-400">
              <li>Biomechanical Strength</li>
              <li>Olympic Free Weights</li>
              <li>Functional CrossFit Turf</li>
              <li>Steam Bath & Recovery Spa</li>
              <li>Zumba & Aerobics Studio</li>
              <li>Women&apos;s Training Zone</li>
            </ul>
          </div>

          {/* Member Portals & Admin */}
          <div className="space-y-3">
            <h5 className="font-bold uppercase tracking-wider text-white text-xs">Portals</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:text-[#FFC62A] transition-colors flex items-center gap-1">
                  Member Dashboard <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FFC62A] transition-colors flex items-center gap-1">
                  Trainer Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FFC62A] transition-colors flex items-center gap-1">
                  Admin Panel (Stage 5) <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/api/health" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono text-[11px]">
                  Database Health Check
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 RV Fitness, Narsobawadi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, Tailwind & MongoDB for RV Fitness
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
