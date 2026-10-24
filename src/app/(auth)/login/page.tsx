'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Dumbbell, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to login');

      // Redirect according to authenticated role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else if (data.user.role === 'trainer') {
        router.push('/dashboard/trainer');
      } else {
        router.push('/dashboard/member');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credential autofill helpers for immediate testing
  const autofillDemo = (role: 'admin' | 'trainer' | 'member') => {
    if (role === 'admin') {
      setEmail('admin@rvfitness.local');
      setPassword('AdminPassword@2026');
    } else if (role === 'trainer') {
      setEmail('vikram@rvfitness.local');
      setPassword('Trainer@2026');
    } else {
      setEmail('sarth@rvfitness.local');
      setPassword('Member@2026');
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFC62A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FFC62A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center gap-2 group">
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
            Sign In To Your Arena
          </h1>
          <p className="text-xs text-zinc-400">
            Access your workout schedule, membership passes, or management console
          </p>
        </div>

        {/* Quick Demo Autofill Bar */}
        <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-[#FFC62A] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Login:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => autofillDemo('admin')}
              className="py-1.5 px-2 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white font-bold hover:border-[#FFC62A] hover:text-[#FFC62A] transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => autofillDemo('trainer')}
              className="py-1.5 px-2 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white font-bold hover:border-[#FFC62A] hover:text-[#FFC62A] transition-colors"
            >
              Trainer
            </button>
            <button
              type="button"
              onClick={() => autofillDemo('member')}
              className="py-1.5 px-2 rounded-lg bg-zinc-900 border border-zinc-700/80 text-white font-bold hover:border-[#FFC62A] hover:text-[#FFC62A] transition-colors"
            >
              Member
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@rvfitness.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase text-zinc-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#FFC62A] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoading}
                className="w-full text-xs py-3.5"
              >
                Sign In To Account →
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#FFC62A] font-bold hover:underline">
              Register Free Here
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to RV Fitness Home
          </Link>
        </div>
      </div>
    </main>
  );
}
