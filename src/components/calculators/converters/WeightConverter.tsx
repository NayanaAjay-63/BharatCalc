import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'kg', name: 'Kilograms', factor: 1 },
  { id: 'g', name: 'Grams', factor: 1000 },
  { id: 'mg', name: 'Milligrams', factor: 1000000 },
  { id: 'lb', name: 'Pounds', factor: 2.20462 },
  { id: 'oz', name: 'Ounces', factor: 35.274 },
  { id: 'ton', name: 'Metric Tons', factor: 0.001 },
  { id: 'stone', name: 'Stones', factor: 0.157473 },
];

export const WeightConverter: React.FC = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(value);
    if (!isNaN(val) && val >= 0) {
      const fromFactor = units.find((u) => u.id === fromUnit)?.factor || 1;
      const toFactor = units.find((u) => u.id === toUnit)?.factor || 1;
      // Convert to kg first, then to target unit
      const inKg = val / fromFactor;
      const converted = inKg * toFactor;
      setResult(converted);
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Convert between different weight and mass units.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fromUnit">From</Label>
          <select
            id="fromUnit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="toUnit">To</Label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={swapUnits}
        className="flex items-center gap-2 mx-auto text-sm text-primary hover:underline"
      >
        <ArrowLeftRight className="w-4 h-4" />
        Swap Units
      </button>

      {result !== null && (
        <ResultDisplay
          label={`${value} ${units.find((u) => u.id === fromUnit)?.name}`}
          value={`${result.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${units.find((u) => u.id === toUnit)?.name}`}
          highlight
          size="lg"
        />
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Common Conversions:</p>
        <ul className="text-muted-foreground space-y-1">
          <li>• 1 kg = 2.205 pounds</li>
          <li>• 1 pound = 16 ounces</li>
          <li>• 1 stone = 14 pounds = 6.35 kg</li>
        </ul>
      </div>
    </div>
  );
};
