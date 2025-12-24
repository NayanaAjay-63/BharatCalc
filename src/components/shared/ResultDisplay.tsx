import React from 'react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  unit,
  highlight = false,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl transition-all duration-200',
        highlight ? 'bg-primary/10 border border-primary/20' : 'bg-secondary',
        className
      )}
    >
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className={cn('font-bold tabular-nums', sizeClasses[size], highlight && 'text-primary')}>
        {value}
        {unit && <span className="text-muted-foreground font-normal text-base ml-1">{unit}</span>}
      </p>
    </div>
  );
};
