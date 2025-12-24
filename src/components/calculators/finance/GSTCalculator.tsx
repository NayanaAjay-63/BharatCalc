import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Button } from '@/components/ui/button';

export const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [result, setResult] = useState<{
    gstAmount: number;
    cgst: number;
    sgst: number;
    totalAmount: number;
    originalAmount: number;
  } | null>(null);

  useEffect(() => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (amt > 0 && rate >= 0) {
      if (mode === 'exclusive') {
        // GST is added on top of amount
        const gstAmount = (amt * rate) / 100;
        const totalAmount = amt + gstAmount;
        setResult({
          originalAmount: amt,
          gstAmount,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount,
        });
      } else {
        // GST is included in amount
        const originalAmount = (amt * 100) / (100 + rate);
        const gstAmount = amt - originalAmount;
        setResult({
          originalAmount,
          gstAmount,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount: amt,
        });
      }
    } else {
      setResult(null);
    }
  }, [amount, gstRate, mode]);

  const gstRates = ['5', '12', '18', '28'];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate GST amounts with CGST and SGST breakdown.
      </p>

      <div className="flex gap-2 p-1 bg-secondary rounded-lg">
        <Button
          variant={mode === 'exclusive' ? 'swiss' : 'ghost'}
          className="flex-1"
          onClick={() => setMode('exclusive')}
        >
          Add GST
        </Button>
        <Button
          variant={mode === 'inclusive' ? 'swiss' : 'ghost'}
          className="flex-1"
          onClick={() => setMode('inclusive')}
        >
          Remove GST
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">
            {mode === 'exclusive' ? 'Amount (without GST)' : 'Amount (with GST)'}
          </Label>
          <Input
            id="amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <Label>GST Rate (%)</Label>
          <div className="flex gap-2">
            {gstRates.map((rate) => (
              <Button
                key={rate}
                variant={gstRate === rate ? 'swiss' : 'outline'}
                size="sm"
                onClick={() => setGstRate(rate)}
                className="flex-1"
              >
                {rate}%
              </Button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label={mode === 'exclusive' ? 'Total Amount (with GST)' : 'Original Amount (without GST)'}
            value={`₹${(mode === 'exclusive' ? result.totalAmount : result.originalAmount).toFixed(2)}`}
            highlight
            size="lg"
          />
          
          <div className="grid sm:grid-cols-3 gap-4">
            <ResultDisplay
              label="GST Amount"
              value={`₹${result.gstAmount.toFixed(2)}`}
            />
            <ResultDisplay
              label="CGST"
              value={`₹${result.cgst.toFixed(2)}`}
            />
            <ResultDisplay
              label="SGST"
              value={`₹${result.sgst.toFixed(2)}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
