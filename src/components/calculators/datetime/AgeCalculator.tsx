import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Calendar } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    nextBirthday: number;
  } | null>(null);

  useEffect(() => {
    if (!birthDate) {
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setResult(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate days until next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      nextBirthday: daysUntilBirthday,
    });
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Precise time and date utilities.
      </p>

      <div>
        <Label htmlFor="birthDate">Date of Birth</Label>
        <div className="relative">
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="pr-10"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Your Age"
            value={`${result.years} years, ${result.months} months, ${result.days} days`}
            highlight
            size="md"
          />
          
          <div className="grid sm:grid-cols-3 gap-4">
            <ResultDisplay
              label="Total Days"
              value={result.totalDays.toLocaleString()}
              unit="days"
            />
            <ResultDisplay
              label="Total Weeks"
              value={result.totalWeeks.toLocaleString()}
              unit="weeks"
            />
            <ResultDisplay
              label="Next Birthday"
              value={result.nextBirthday}
              unit="days away"
            />
          </div>

          <div className="bg-accent/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">You have lived</p>
            <p className="text-2xl font-bold text-primary">
              {(result.totalDays * 24).toLocaleString()} hours
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              That's {(result.totalDays * 24 * 60).toLocaleString()} minutes!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
