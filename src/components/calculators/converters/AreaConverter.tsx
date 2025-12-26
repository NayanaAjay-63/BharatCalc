import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const units = [
  { value: 'sqm', label: 'Square Meters (m²)', factor: 1 },
  { value: 'sqkm', label: 'Square Kilometers (km²)', factor: 1000000 },
  { value: 'sqft', label: 'Square Feet (ft²)', factor: 0.092903 },
  { value: 'sqyd', label: 'Square Yards (yd²)', factor: 0.836127 },
  { value: 'sqmi', label: 'Square Miles (mi²)', factor: 2589988.11 },
  { value: 'acre', label: 'Acres', factor: 4046.86 },
  { value: 'hectare', label: 'Hectares (ha)', factor: 10000 },
  { value: 'sqin', label: 'Square Inches (in²)', factor: 0.00064516 },
  { value: 'sqcm', label: 'Square Centimeters (cm²)', factor: 0.0001 },
  { value: 'sqmm', label: 'Square Millimeters (mm²)', factor: 0.000001 },
];

export const AreaConverter: React.FC = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('sqm');
  const [toUnit, setToUnit] = useState('sqft');
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

    // Convert to square meters first, then to target unit
    const sqMeters = inputValue * fromFactor;
    const converted = sqMeters / toFactor;
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
