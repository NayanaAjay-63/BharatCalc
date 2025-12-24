import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Shuffle } from 'lucide-react';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState('');

  const generate = () => {
    setError('');
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      setError('Please enter valid numbers');
      return;
    }

    if (minVal > maxVal) {
      setError('Minimum must be less than maximum');
      return;
    }

    if (countVal < 1 || countVal > 100) {
      setError('Count must be between 1 and 100');
      return;
    }

    const newResults: number[] = [];
    for (let i = 0; i < countVal; i++) {
      newResults.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
    setResults(newResults);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Generate random integers within a specified range.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="min">Minimum</Label>
          <Input
            id="min"
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="max">Maximum</Label>
          <Input
            id="max"
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="count">Count</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button variant="swiss" onClick={generate} className="w-full">
        <Shuffle className="w-4 h-4 mr-2" />
        Generate
      </Button>

      {results.length > 0 && (
        <div className="animate-fade-in">
          <ResultDisplay
            label="Random Number(s)"
            value={results.join(', ')}
            highlight
            size="lg"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground mr-2">Presets:</span>
        {[
          { label: 'Dice (1-6)', min: '1', max: '6' },
          { label: 'Coin (0-1)', min: '0', max: '1' },
          { label: '1-10', min: '1', max: '10' },
          { label: '1-1000', min: '1', max: '1000' },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setMin(preset.min);
              setMax(preset.max);
            }}
            className="px-3 py-1 rounded-full text-sm bg-secondary hover:bg-accent transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
