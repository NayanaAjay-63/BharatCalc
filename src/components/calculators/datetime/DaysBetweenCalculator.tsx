import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Calendar } from 'lucide-react';

export const DaysBetweenCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = days / 7;
    const months = days / 30.44; // Average days in a month
    const years = days / 365.25; // Account for leap years

    setResult({ days, weeks, months, years });
  }, [startDate, endDate]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextYear.toISOString().split('T')[0]);
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate the number of days between two dates.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <div className="relative">
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <div className="relative">
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Days Between"
            value={result.days.toLocaleString()}
            unit="days"
            highlight
            size="lg"
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <ResultDisplay
              label="Weeks"
              value={result.weeks.toFixed(1)}
              unit="weeks"
            />
            <ResultDisplay
              label="Months"
              value={result.months.toFixed(1)}
              unit="months"
            />
            <ResultDisplay
              label="Years"
              value={result.years.toFixed(2)}
              unit="years"
            />
          </div>
        </div>
      )}
    </div>
  );
};
