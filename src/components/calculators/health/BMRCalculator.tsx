import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Slider } from '@/components/ui/slider';

export const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
  } | null>(null);

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (w >= 10 && w <= 300 && h >= 50 && h <= 250 && a >= 0 && a <= 120) {
      // Mifflin-St Jeor Equation
      let bmr: number;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      const tdee = bmr * activity;
      setResult({ bmr, tdee });
    } else {
      setResult(null);
    }
  }, [weight, height, age, gender, activityLevel]);

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)' },
    { value: '1.375', label: 'Light (1-3 days/week)' },
    { value: '1.55', label: 'Moderate (3-5 days/week)' },
    { value: '1.725', label: 'Active (6-7 days/week)' },
    { value: '1.9', label: 'Very Active (intense daily)' },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Gender</Label>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                gender === 'male'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-border hover:bg-accent'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                gender === 'female'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-border hover:bg-accent'
              }`}
            >
              Female
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="10"
            max="300"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            min="50"
            max="250"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="activity">Activity Level</Label>
        <select
          id="activity"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
        >
          {activityLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultDisplay
            label="Basal Metabolic Rate (BMR)"
            value={`${Math.round(result.bmr)} calories/day`}
            highlight
            size="lg"
          />
          <ResultDisplay
            label="Total Daily Energy Expenditure (TDEE)"
            value={`${Math.round(result.tdee)} calories/day`}
          />
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Daily Calorie Targets:</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Weight Loss</p>
                <p className="font-semibold text-primary">{Math.round(result.tdee - 500)}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Maintain</p>
                <p className="font-semibold">{Math.round(result.tdee)}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Weight Gain</p>
                <p className="font-semibold text-primary">{Math.round(result.tdee + 500)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">Mifflin-St Jeor Equation:</p>
        <p className="text-muted-foreground">
          Men: BMR = 10W + 6.25H - 5A + 5<br />
          Women: BMR = 10W + 6.25H - 5A - 161
        </p>
      </div>
    </div>
  );
};
