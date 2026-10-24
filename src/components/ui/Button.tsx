'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Disc3 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'text-zinc-400 hover:text-white transition-colors px-4 py-2 text-sm font-semibold';

  return (
    <button
      className={cn(baseClass, isLoading && 'opacity-80 cursor-wait', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Disc3 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {children}
          {icon && <span className="inline-block transition-transform group-hover:translate-x-1">{icon}</span>}
        </>
      )}
    </button>
  );
}

export default Button;
