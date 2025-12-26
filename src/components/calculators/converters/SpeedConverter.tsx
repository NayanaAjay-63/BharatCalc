import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const units = [
  { value: 'mps', label: 'Meters per second (m/s)', factor: 1 },
  { value: 'kmph', label: 'Kilometers per hour (km/h)', factor: 0.277778 },
  { value: 'mph', label: 'Miles per hour (mph)', factor: 0.44704 },
  { value: 'fps', label: 'Feet per second (ft/s)', factor: 0.3048 },
  { value: 'knot', label: 'Knots (kn)', factor: 0.514444 },
  { value: 'mach', label: 'Mach (at sea level)', factor: 343 },
  { value: 'lightspeed', label: 'Speed of Light (c)', factor: 299792458 },
];

export const SpeedConverter: React.FC = () => {
  const [value, setValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('kmph');
  const [toUnit, setToUnit] = useState('mph');
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

    // Convert to m/s first, then to target unit
    const mps = inputValue * fromFactor;
    const converted = mps / toFactor;
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
    if (num < 0.0001 && num !== 0) {
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
