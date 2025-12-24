import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
  } | null>(null);

  useEffect(() => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price > 0 && discount >= 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;
      setResult({ discountAmount, finalPrice });
    } else {
      setResult(null);
    }
  }, [originalPrice, discountPercent]);

  const quickDiscounts = [10, 20, 25, 50];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate discounted prices quickly and easily.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="originalPrice">Original Price</Label>
          <Input
            id="originalPrice"
            type="number"
            min="0"
            placeholder="Enter original price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="discountPercent">Discount (%)</Label>
          <Input
            id="discountPercent"
            type="number"
            min="0"
            max="100"
            placeholder="Enter discount percentage"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground mr-2">Quick:</span>
        {quickDiscounts.map((d) => (
          <button
            key={d}
            onClick={() => setDiscountPercent(String(d))}
            className="px-3 py-1 rounded-full text-sm bg-secondary hover:bg-accent transition-colors"
          >
            {d}%
          </button>
        ))}
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Final Price"
            value={`₹${result.finalPrice.toFixed(2)}`}
            highlight
            size="lg"
          />
          <ResultDisplay
            label="You Save"
            value={`₹${result.discountAmount.toFixed(2)}`}
          />
        </div>
      )}
    </div>
  );
};
