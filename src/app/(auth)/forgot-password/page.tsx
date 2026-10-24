'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
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
            Reset Password
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your email and we will send you password reset instructions
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#FFC62A] mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white uppercase">Reset Link Dispatched</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If an account exists for <strong className="text-white">{email}</strong>, a secure password reset link has been dispatched.
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button variant="primary" className="text-xs">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  Account Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#FFC62A]"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={loading}
                  className="w-full text-xs py-3.5"
                >
                  Send Reset Link →
                </Button>
              </div>
            </form>
          )}

          <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
            Remembered your credentials?{' '}
            <Link href="/login" className="text-[#FFC62A] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
