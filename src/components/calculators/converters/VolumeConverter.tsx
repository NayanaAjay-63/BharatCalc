import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const units = [
  { value: 'liter', label: 'Liters (L)', factor: 1 },
  { value: 'ml', label: 'Milliliters (mL)', factor: 0.001 },
  { value: 'cubicm', label: 'Cubic Meters (m³)', factor: 1000 },
  { value: 'cubiccm', label: 'Cubic Centimeters (cm³)', factor: 0.001 },
  { value: 'cubicin', label: 'Cubic Inches (in³)', factor: 0.0163871 },
  { value: 'cubicft', label: 'Cubic Feet (ft³)', factor: 28.3168 },
  { value: 'gallon_us', label: 'US Gallons', factor: 3.78541 },
  { value: 'gallon_uk', label: 'UK Gallons', factor: 4.54609 },
  { value: 'quart_us', label: 'US Quarts', factor: 0.946353 },
  { value: 'pint_us', label: 'US Pints', factor: 0.473176 },
  { value: 'cup_us', label: 'US Cups', factor: 0.236588 },
  { value: 'floz_us', label: 'US Fluid Ounces', factor: 0.0295735 },
  { value: 'tablespoon', label: 'Tablespoons', factor: 0.0147868 },
  { value: 'teaspoon', label: 'Teaspoons', factor: 0.00492892 },
];

export const VolumeConverter: React.FC = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('liter');
  const [toUnit, setToUnit] = useState('gallon_us');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit]);

  const convert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      setResult(null);
      return;
    }

    const fromFactor = units.find((u) => u.value === fromUnit)?.factor || 1;
    const toFactor = units.find((u) => u.value === toUnit)?.factor || 1;

    // Convert to liters first, then to target unit
    const liters = inputValue * fromFactor;
    const converted = liters / toFactor;
    setResult(converted);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const formatResult = (num: number): string => {
    if (num >= 1000000) {
      return num.toExponential(4);
    }
    if (num < 0.0001) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min="0"
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
        <div className="space-y-2">
          <Label>From</Label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.value} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon" onClick={swapUnits}>
          <ArrowLeftRight className="h-4 w-4" />
        </Button>

        <div className="space-y-2">
          <Label>To</Label>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.value} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {result !== null && (
        <div className="text-center p-6 bg-accent/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            {value} {units.find((u) => u.value === fromUnit)?.label} =
          </p>
          <p className="text-3xl font-bold text-primary">
            {formatResult(result)}
          </p>
          <p className="text-lg text-muted-foreground mt-1">
            {units.find((u) => u.value === toUnit)?.label}
          </p>
        </div>
      )}
    </div>
  );
};
