'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export function FloatingWhatsApp() {
  const prefilledMessage = encodeURIComponent(
    'Hello RV Fitness Narsobawadi! I would like to enquire about gym memberships and training programs.'
  );
  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsapp}?text=${prefilledMessage}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(37,211,102,0.8)] active:scale-95"
        aria-label="Chat with RV Fitness on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300" />
        </span>
      </a>

      {/* Hover tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
        Chat with RV Fitness
      </div>
    </aside>
  );
}

export default FloatingWhatsApp;
