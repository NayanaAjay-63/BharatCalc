import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Plus, Minus, Trash2 } from 'lucide-react';

export const AverageCalculator: React.FC = () => {
  const [numbers, setNumbers] = useState<string[]>(['', '']);
  const [result, setResult] = useState<{
    mean: number;
    median: number;
    mode: string;
    sum: number;
    count: number;
  } | null>(null);

  const addNumber = () => setNumbers([...numbers, '']);
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  useEffect(() => {
    const validNumbers = numbers
      .map((n) => parseFloat(n))
      .filter((n) => !isNaN(n));

    if (validNumbers.length < 2) {
      setResult(null);
      return;
    }

    const sum = validNumbers.reduce((a, b) => a + b, 0);
    const mean = sum / validNumbers.length;

    // Median
    const sorted = [...validNumbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const frequency: Record<number, number> = {};
    validNumbers.forEach((n) => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num));
    const modeStr = maxFreq === 1 ? 'No mode' : modes.join(', ');

    setResult({
      mean,
      median,
      mode: modeStr,
      sum,
      count: validNumbers.length,
    });
  }, [numbers]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate mean, median, and mode of a set of numbers.
      </p>

      <div className="space-y-3">
        <Label>Enter Numbers</Label>
        {numbers.map((num, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="number"
              placeholder={`Number ${index + 1}`}
              value={num}
              onChange={(e) => updateNumber(index, e.target.value)}
            />
            {numbers.length > 2 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeNumber(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addNumber} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Number
        </Button>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay label="Mean (Average)" value={result.mean.toFixed(4)} highlight size="lg" />
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultDisplay label="Median" value={result.median.toFixed(4)} />
            <ResultDisplay label="Mode" value={result.mode} />
            <ResultDisplay label="Sum" value={result.sum.toFixed(4)} />
            <ResultDisplay label="Count" value={result.count.toString()} />
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Definitions:</p>
        <ul className="text-muted-foreground space-y-1">
          <li>• <strong>Mean:</strong> Sum of all values divided by count</li>
          <li>• <strong>Median:</strong> Middle value when sorted</li>
          <li>• <strong>Mode:</strong> Most frequently occurring value</li>
        </ul>
      </div>
    </div>
  );
};
