'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'member',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');

      // Redirect to member dashboard
      router.push('/dashboard/member');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#FFC62A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <div className="relative w-12 h-12">
              <Image src="/logo/rv-logo.svg" alt="RV Fitness" fill className="object-contain" priority />
            </div>
            <div className="text-left">
              <span className="font-black text-xl tracking-wider text-white uppercase block leading-none">
                RV FITNESS
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFC62A] block mt-1">
                NARSOBAWADI
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight pt-2">
            Create Your Account
          </h1>
          <p className="text-xs text-zinc-400">
            Join the RV Fitness community and start your disciplined transformation
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarth Patil"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="sarth@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                WhatsApp / Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Create Password (Min 6 chars)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoading}
                className="w-full text-xs py-3.5"
              >
                Register & Enter Arena →
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FFC62A] font-bold hover:underline">
              Log In Here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
