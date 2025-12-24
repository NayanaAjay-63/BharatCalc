import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('8');
  const [time, setTime] = useState('3');
  const [result, setResult] = useState<{
    interest: number;
    amount: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (P > 0 && R >= 0 && R <= 100 && T > 0) {
      // SI = (P × R × T) / 100
      const interest = (P * R * T) / 100;
      const amount = P + interest;
      setResult({ interest, amount });
    } else {
      setResult(null);
    }
  }, [principal, rate, time]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate simple interest on a principal amount.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="principal">Principal (₹)</Label>
          <Input
            id="principal"
            type="number"
            min="0"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rate">Rate (% per annum)</Label>
          <Input
            id="rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="time">Time (Years)</Label>
          <Input
            id="time"
            type="number"
            min="0"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Simple Interest"
            value={`₹${result.interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
            highlight
            size="lg"
          />
          <ResultDisplay
            label="Total Amount"
            value={`₹${result.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
          />
        </div>
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Formula:</p>
        <p className="text-muted-foreground font-mono">SI = (P × R × T) / 100</p>
        <p className="text-muted-foreground mt-2">Where P = Principal, R = Rate, T = Time in years</p>
      </div>
    </div>
  );
};
