import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'success' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-amber-400/10 text-[#FFC62A] border-amber-400/30',
    dark: 'bg-zinc-900/80 text-zinc-300 border-zinc-700/50',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    outline: 'bg-transparent text-zinc-300 border-zinc-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
