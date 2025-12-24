import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Slider } from '@/components/ui/slider';

export const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('12');
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const N = parseFloat(tenure);

    if (P > 0 && annualRate > 0 && N > 0) {
      const R = annualRate / 12 / 100; // Monthly interest rate
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalPayment = emi * N;
      const totalInterest = totalPayment - P;

      setResult({
        emi: Math.round(emi * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
      });
    } else {
      setResult(null);
    }
  }, [principal, rate, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Smart financial tools for planning and decisions.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="principal">Loan Amount</Label>
            <span className="text-sm font-medium">{formatCurrency(parseFloat(principal) || 0)}</span>
          </div>
          <Input
            id="principal"
            type="number"
            min="0"
            placeholder="Enter loan amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
          <Slider
            value={[parseFloat(principal) || 0]}
            onValueChange={([value]) => setPrincipal(String(value))}
            min={100000}
            max={10000000}
            step={50000}
            className="mt-3"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
            <span className="text-sm font-medium">{rate}%</span>
          </div>
          <Input
            id="rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="Enter interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <Slider
            value={[parseFloat(rate) || 0]}
            onValueChange={([value]) => setRate(String(value))}
            min={5}
            max={20}
            step={0.1}
            className="mt-3"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="tenure">Loan Tenure (months)</Label>
            <span className="text-sm font-medium">{tenure} months</span>
          </div>
          <Input
            id="tenure"
            type="number"
            min="1"
            placeholder="Enter tenure in months"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
          <Slider
            value={[parseFloat(tenure) || 0]}
            onValueChange={([value]) => setTenure(String(value))}
            min={6}
            max={360}
            step={6}
            className="mt-3"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Monthly EMI"
            value={formatCurrency(result.emi)}
            highlight
            size="lg"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay
              label="Total Interest"
              value={formatCurrency(result.totalInterest)}
            />
            <ResultDisplay
              label="Total Payment"
              value={formatCurrency(result.totalPayment)}
            />
          </div>
          
          {/* Visual breakdown */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-3">Payment Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-primary h-full"
                style={{ width: `${(parseFloat(principal) / result.totalPayment) * 100}%` }}
              />
              <div
                className="bg-primary/30 h-full"
                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Principal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/30" />
                Interest
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
