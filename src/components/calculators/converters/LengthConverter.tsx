import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { ArrowLeftRight } from 'lucide-react';

const lengthUnits = {
  mm: { name: 'Millimeter', factor: 0.001 },
  cm: { name: 'Centimeter', factor: 0.01 },
  m: { name: 'Meter', factor: 1 },
  km: { name: 'Kilometer', factor: 1000 },
  inch: { name: 'Inch', factor: 0.0254 },
  ft: { name: 'Foot', factor: 0.3048 },
  yd: { name: 'Yard', factor: 0.9144 },
  mi: { name: 'Mile', factor: 1609.344 },
};

type UnitKey = keyof typeof lengthUnits;

export const LengthConverter: React.FC = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<UnitKey>('m');
  const [toUnit, setToUnit] = useState<UnitKey>('ft');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const meters = val * lengthUnits[fromUnit].factor;
      const converted = meters / lengthUnits[toUnit].factor;
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
        Convert anything, instantly.
      </p>

      <div className="grid sm:grid-cols-[1fr,auto,1fr] gap-4 items-end">
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={swapUnits}
          className="mb-0.5"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>

        <div>
          <Label>Result</Label>
          <Input
            type="text"
            value={result !== null ? result.toFixed(6).replace(/\.?0+$/, '') : '-'}
            readOnly
            className="bg-secondary/50"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>From</Label>
          <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as UnitKey)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(lengthUnits).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>
                  {name} ({key})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>To</Label>
          <Select value={toUnit} onValueChange={(v) => setToUnit(v as UnitKey)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(lengthUnits).map(([key, { name }]) => (
                <SelectItem key={key} value={key}>
                  {name} ({key})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {result !== null && (
        <ResultDisplay
          label="Conversion Result"
          value={`${value} ${fromUnit} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${toUnit}`}
          highlight
          size="md"
        />
      )}

      <div className="bg-secondary/50 rounded-lg p-4">
        <p className="text-sm font-medium mb-2">Quick Reference</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <span>1 inch = 2.54 cm</span>
          <span>1 foot = 0.3048 m</span>
          <span>1 mile = 1.609 km</span>
          <span>1 yard = 0.914 m</span>
        </div>
      </div>
    </div>
  );
};
