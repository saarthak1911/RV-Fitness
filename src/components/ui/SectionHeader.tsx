import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlightWord?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlightWord,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-3 mb-10', centered && 'text-center flex flex-col items-center', className)}>
      <div className="eyebrow-badge">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC62A] animate-pulse" />
        {eyebrow}
      </div>

      <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
        {highlightWord ? (
          <>
            {title.replace(highlightWord, '')}
            <span className="text-[#FFC62A]">{highlightWord}</span>
          </>
        ) : (
          title
        )}
      </h2>

      <div className={cn('gold-divider', centered && 'mx-auto')} />

      {description && (
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
