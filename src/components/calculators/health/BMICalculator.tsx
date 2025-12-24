import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Slider } from '@/components/ui/slider';

export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    const h = parseFloat(height) / 100; // Convert cm to m
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category: string;
      let color: string;

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-500';
      } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'text-primary';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-500';
      } else {
        category = 'Obese';
        color = 'text-destructive';
      }

      setResult({
        bmi: Math.round(bmi * 10) / 10,
        category,
        color,
      });
    } else {
      setResult(null);
    }
  }, [height, weight]);

  const getBMIPosition = (bmi: number) => {
    // Map BMI 15-40 to 0-100%
    const clamped = Math.max(15, Math.min(40, bmi));
    return ((clamped - 15) / 25) * 100;
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Health calculations made simple.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="height">Height</Label>
            <span className="text-sm font-medium">{height} cm</span>
          </div>
          <Slider
            value={[parseFloat(height) || 0]}
            onValueChange={([value]) => setHeight(String(value))}
            min={100}
            max={220}
            step={1}
          />
          <Input
            id="height"
            type="number"
            min="0"
            placeholder="Enter height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-3"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="weight">Weight</Label>
            <span className="text-sm font-medium">{weight} kg</span>
          </div>
          <Slider
            value={[parseFloat(weight) || 0]}
            onValueChange={([value]) => setWeight(String(value))}
            min={30}
            max={200}
            step={0.5}
          />
          <Input
            id="weight"
            type="number"
            min="0"
            step="0.1"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-3"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Your BMI"
            value={result.bmi}
            highlight
            size="lg"
          />
          
          <div className={`text-center p-4 rounded-xl bg-secondary ${result.color}`}>
            <p className="text-lg font-semibold">{result.category}</p>
          </div>

          {/* BMI Scale */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-3">BMI Scale</p>
            <div className="relative h-3 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-blue-400" />
                <div className="flex-1 bg-primary" />
                <div className="flex-1 bg-yellow-400" />
                <div className="flex-1 bg-destructive" />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground rounded-full shadow-lg"
                style={{ left: `${getBMIPosition(result.bmi)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
