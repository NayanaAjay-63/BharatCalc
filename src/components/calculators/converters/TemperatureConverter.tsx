import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { ArrowLeftRight } from 'lucide-react';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState('100');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    // Convert to Celsius first
    let celsius: number;
    switch (fromUnit) {
      case 'celsius':
        celsius = val;
        break;
      case 'fahrenheit':
        celsius = (val - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = val - 273.15;
        break;
    }

    // Convert from Celsius to target
    let converted: number;
    switch (toUnit) {
      case 'celsius':
        converted = celsius;
        break;
      case 'fahrenheit':
        converted = celsius * 9 / 5 + 32;
        break;
      case 'kelvin':
        converted = celsius + 273.15;
        break;
    }

    setResult(converted);
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const unitNames: Record<TempUnit, string> = {
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    kelvin: 'Kelvin (K)',
  };

  const unitSymbols: Record<TempUnit, string> = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K',
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Convert between Celsius, Fahrenheit, and Kelvin.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fromUnit">From</Label>
          <select
            id="fromUnit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as TempUnit)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {Object.entries(unitNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="toUnit">To</Label>
          <select
            id="toUnit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as TempUnit)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {Object.entries(unitNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
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
          label={`${value}${unitSymbols[fromUnit]}`}
          value={`${result.toFixed(2)}${unitSymbols[toUnit]}`}
          highlight
          size="lg"
        />
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Quick Reference:</p>
        <ul className="text-muted-foreground space-y-1">
          <li>• Water freezes: 0°C = 32°F = 273.15K</li>
          <li>• Water boils: 100°C = 212°F = 373.15K</li>
          <li>• Body temperature: 37°C = 98.6°F</li>
          <li>• Absolute zero: -273.15°C = -459.67°F = 0K</li>
        </ul>
      </div>
    </div>
  );
};
