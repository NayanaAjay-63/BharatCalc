import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon,
  href,
  className,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        'group swiss-card flex items-start gap-4 hover:border-primary/30 animate-fade-in',
        className
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
    </Link>
  );
};
