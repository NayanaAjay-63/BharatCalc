import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';

export const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [percentageOf, setPercentageOf] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(value);
    const pct = parseFloat(percentage);
    
    if (!isNaN(val) && !isNaN(pct)) {
      setResult((val * pct) / 100);
    } else {
      setResult(null);
    }

    if (!isNaN(val) && !isNaN(pct) && pct !== 0) {
      setPercentageOf((val / pct) * 100);
    } else {
      setPercentageOf(null);
    }
  }, [value, percentage]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Quick everyday math, done instantly.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            placeholder="Enter a value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="percentage">Percentage (%)</Label>
          <Input
            id="percentage"
            type="number"
            placeholder="Enter percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
      </div>

      {result !== null && (
        <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
          <ResultDisplay
            label={`${percentage}% of ${value}`}
            value={result.toFixed(2)}
            highlight
          />
          <ResultDisplay
            label={`${value} is what % of result`}
            value={percentageOf !== null ? `${percentageOf.toFixed(2)}%` : '-'}
          />
        </div>
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Common Calculations:</p>
        <ul className="text-muted-foreground space-y-1">
          <li>• Tip calculation: Enter bill amount and tip %</li>
          <li>• Discount: Enter price and discount %</li>
          <li>• Tax: Enter amount and tax rate %</li>
        </ul>
      </div>
    </div>
  );
};
