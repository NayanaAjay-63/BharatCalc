import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const units = [
  { value: 'bit', label: 'Bits (b)', factor: 1 },
  { value: 'byte', label: 'Bytes (B)', factor: 8 },
  { value: 'kilobit', label: 'Kilobits (Kb)', factor: 1000 },
  { value: 'kilobyte', label: 'Kilobytes (KB)', factor: 8000 },
  { value: 'kibibyte', label: 'Kibibytes (KiB)', factor: 8192 },
  { value: 'megabit', label: 'Megabits (Mb)', factor: 1000000 },
  { value: 'megabyte', label: 'Megabytes (MB)', factor: 8000000 },
  { value: 'mebibyte', label: 'Mebibytes (MiB)', factor: 8388608 },
  { value: 'gigabit', label: 'Gigabits (Gb)', factor: 1000000000 },
  { value: 'gigabyte', label: 'Gigabytes (GB)', factor: 8000000000 },
  { value: 'gibibyte', label: 'Gibibytes (GiB)', factor: 8589934592 },
  { value: 'terabit', label: 'Terabits (Tb)', factor: 1000000000000 },
  { value: 'terabyte', label: 'Terabytes (TB)', factor: 8000000000000 },
  { value: 'tebibyte', label: 'Tebibytes (TiB)', factor: 8796093022208 },
  { value: 'petabyte', label: 'Petabytes (PB)', factor: 8000000000000000 },
];

export const DataUnitsConverter: React.FC = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('gigabyte');
  const [toUnit, setToUnit] = useState('megabyte');
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

    // Convert to bits first, then to target unit
    const bits = inputValue * fromFactor;
    const converted = bits / toFactor;
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

      <div className="text-xs text-muted-foreground">
        <p className="font-medium mb-2">Quick Reference:</p>
        <ul className="space-y-1">
          <li>1 Byte = 8 Bits</li>
          <li>1 KB = 1,000 Bytes (decimal)</li>
          <li>1 KiB = 1,024 Bytes (binary)</li>
          <li>1 MB = 1,000 KB = 1,000,000 Bytes</li>
          <li>1 MiB = 1,024 KiB = 1,048,576 Bytes</li>
        </ul>
      </div>
    </div>
  );
};
