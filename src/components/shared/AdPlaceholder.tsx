import React from 'react';
import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  size: 'leaderboard' | 'sidebar' | 'banner' | 'square';
  className?: string;
}

const sizeClasses = {
  leaderboard: 'w-full max-w-[728px] h-[90px]',
  sidebar: 'w-[300px] h-[250px]',
  banner: 'w-full h-[100px]',
  square: 'w-[250px] h-[250px]',
};

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ size, className }) => {
  return (
    <div
      className={cn(
        'ad-placeholder flex-col gap-1',
        sizeClasses[size],
        className
      )}
    >
      <span className="text-xs font-medium opacity-60">Advertisement</span>
      <span className="text-[10px] opacity-40">
        {size === 'leaderboard' ? '728 × 90' : size === 'sidebar' ? '300 × 250' : size === 'banner' ? 'Full Width' : '250 × 250'}
      </span>
    </div>
  );
};
