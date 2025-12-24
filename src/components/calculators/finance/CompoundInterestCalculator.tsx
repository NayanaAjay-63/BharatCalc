import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('8');
  const [time, setTime] = useState('5');
  const [compound, setCompound] = useState('12'); // times per year
  const [result, setResult] = useState<{
    amount: number;
    interest: number;
    principal: number;
  } | null>(null);

  useEffect(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);

    if (P > 0 && r >= 0 && r <= 1 && t > 0 && n > 0) {
      // A = P(1 + r/n)^(nt)
      const A = P * Math.pow(1 + r / n, n * t);
      const interest = A - P;
      setResult({ amount: A, interest, principal: P });
    } else {
      setResult(null);
    }
  }, [principal, rate, time, compound]);

  const chartData = result ? [
    { name: 'Principal', value: result.principal, color: 'hsl(var(--primary))' },
    { name: 'Interest', value: result.interest, color: 'hsl(var(--muted-foreground))' },
  ] : [];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate compound interest with flexible compounding frequency.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="principal">Principal Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            min="0"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
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
          <Label htmlFor="time">Time Period (Years)</Label>
          <Input
            id="time"
            type="number"
            min="0"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="compound">Compounding Frequency</Label>
          <select
            id="compound"
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-6 animate-fade-in">
          <ResultDisplay
            label="Total Amount"
            value={`₹${result.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
            highlight
            size="lg"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay
              label="Total Interest Earned"
              value={`₹${result.interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
            />
            <ResultDisplay
              label="Principal Amount"
              value={`₹${result.principal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-medium mb-4 text-center">Principal vs Interest</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Formula:</p>
        <p className="text-muted-foreground font-mono">A = P × (1 + r/n)^(n×t)</p>
        <p className="text-muted-foreground mt-2">Where P = Principal, r = Rate, n = Compounds per year, t = Time</p>
      </div>
    </div>
  );
};
