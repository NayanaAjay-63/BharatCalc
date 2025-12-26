import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const activityLevels = [
  { value: '1.2', label: 'Sedentary (little or no exercise)' },
  { value: '1.375', label: 'Light (exercise 1-3 days/week)' },
  { value: '1.55', label: 'Moderate (exercise 3-5 days/week)' },
  { value: '1.725', label: 'Active (exercise 6-7 days/week)' },
  { value: '1.9', label: 'Very Active (hard exercise daily)' },
];

export const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    mildLoss: number;
    weightLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [age, gender, weight, height, activity]);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const activityMultiplier = parseFloat(activity);

    if (!a || !w || !h || a < 1 || a > 120 || w < 10 || w > 500 || h < 50 || h > 300) {
      setResult(null);
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const maintenance = Math.round(bmr * activityMultiplier);

    setResult({
      bmr: Math.round(bmr),
      maintenance,
      mildLoss: Math.round(maintenance * 0.9), // 10% deficit
      weightLoss: Math.round(maintenance * 0.8), // 20% deficit
      mildGain: Math.round(maintenance * 1.1), // 10% surplus
      weightGain: Math.round(maintenance * 1.2), // 20% surplus
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={gender}
            onValueChange={(v) => setGender(v as 'male' | 'female')}
            className="flex gap-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="10"
            max="500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="50"
            max="300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Activity Level</Label>
        <Select value={activity} onValueChange={setActivity}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {activityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">BMR</p>
              <p className="text-xl font-semibold">{result.bmr} cal/day</p>
            </div>
            <div className="p-4 bg-accent/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Maintenance</p>
              <p className="text-2xl font-bold text-primary">{result.maintenance} cal/day</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Weight Loss Goals</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Mild Loss (~0.25 kg/week)</p>
                <p className="text-lg font-semibold">{result.mildLoss} cal/day</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Weight Loss (~0.5 kg/week)</p>
                <p className="text-lg font-semibold">{result.weightLoss} cal/day</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Weight Gain Goals</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Mild Gain (~0.25 kg/week)</p>
                <p className="text-lg font-semibold">{result.mildGain} cal/day</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Weight Gain (~0.5 kg/week)</p>
                <p className="text-lg font-semibold">{result.weightGain} cal/day</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
