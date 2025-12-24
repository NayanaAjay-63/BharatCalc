import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Slider } from '@/components/ui/slider';

export const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('10000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [result, setResult] = useState<{
    totalInvestment: number;
    estimatedReturns: number;
    totalValue: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 12 / 100;
    const n = parseFloat(timePeriod) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const totalValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const totalInvestment = P * n;
      const estimatedReturns = totalValue - totalInvestment;

      setResult({
        totalInvestment,
        estimatedReturns,
        totalValue,
      });
    } else {
      setResult(null);
    }
  }, [monthlyInvestment, expectedReturn, timePeriod]);

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
        Plan your SIP investments and see potential returns.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="monthlyInvestment">Monthly Investment</Label>
            <span className="text-sm font-medium">{formatCurrency(parseFloat(monthlyInvestment) || 0)}</span>
          </div>
          <Input
            id="monthlyInvestment"
            type="number"
            min="500"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
          />
          <Slider
            value={[parseFloat(monthlyInvestment) || 0]}
            onValueChange={([value]) => setMonthlyInvestment(String(value))}
            min={500}
            max={100000}
            step={500}
            className="mt-3"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="expectedReturn">Expected Return Rate (% p.a.)</Label>
            <span className="text-sm font-medium">{expectedReturn}%</span>
          </div>
          <Input
            id="expectedReturn"
            type="number"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
          />
          <Slider
            value={[parseFloat(expectedReturn) || 0]}
            onValueChange={([value]) => setExpectedReturn(String(value))}
            min={1}
            max={30}
            step={0.5}
            className="mt-3"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="timePeriod">Time Period (years)</Label>
            <span className="text-sm font-medium">{timePeriod} years</span>
          </div>
          <Input
            id="timePeriod"
            type="number"
            min="1"
            max="40"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          />
          <Slider
            value={[parseFloat(timePeriod) || 0]}
            onValueChange={([value]) => setTimePeriod(String(value))}
            min={1}
            max={40}
            step={1}
            className="mt-3"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Estimated Value"
            value={formatCurrency(result.totalValue)}
            highlight
            size="lg"
          />
          
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay
              label="Total Investment"
              value={formatCurrency(result.totalInvestment)}
            />
            <ResultDisplay
              label="Estimated Returns"
              value={formatCurrency(result.estimatedReturns)}
            />
          </div>

          {/* Visual breakdown */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-3">Investment Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-primary h-full"
                style={{ width: `${(result.totalInvestment / result.totalValue) * 100}%` }}
              />
              <div
                className="bg-primary/30 h-full"
                style={{ width: `${(result.estimatedReturns / result.totalValue) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Invested ({((result.totalInvestment / result.totalValue) * 100).toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/30" />
                Returns ({((result.estimatedReturns / result.totalValue) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
