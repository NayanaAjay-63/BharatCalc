import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('170');
  const [neck, setNeck] = useState('38');
  const [waist, setWaist] = useState('85');
  const [hip, setHip] = useState('95'); // Only for females
  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    leanMass: number;
    fatMass: number;
  } | null>(null);
  const [weight, setWeight] = useState('70');

  useEffect(() => {
    calculate();
  }, [gender, height, neck, waist, hip, weight]);

  const calculate = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);
    const wt = parseFloat(weight);

    if (!h || !n || !w || !wt || h < 50 || n < 20 || w < 40) {
      setResult(null);
      return;
    }

    // US Navy Body Fat Formula
    let bodyFat: number;
    
    if (gender === 'male') {
      // BF% = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (!hp || hp < 50) {
        setResult(null);
        return;
      }
      // BF% = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
    }

    bodyFat = Math.max(0, Math.min(100, bodyFat));
    const fatMass = (bodyFat / 100) * wt;
    const leanMass = wt - fatMass;

    // Categorize
    let category: string;
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletes';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 14) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletes';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }

    setResult({
      bodyFat: Math.round(bodyFat * 10) / 10,
      category,
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential Fat':
      case 'Athletes':
        return 'text-green-600';
      case 'Fitness':
        return 'text-blue-600';
      case 'Average':
        return 'text-yellow-600';
      case 'Obese':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          value={gender}
          onValueChange={(v) => setGender(v as 'male' | 'female')}
          className="flex gap-4"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="neck">Neck Circumference (cm)</Label>
          <Input
            id="neck"
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="waist">Waist Circumference (cm)</Label>
          <Input
            id="waist"
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>
      </div>

      {gender === 'female' && (
        <div className="space-y-2">
          <Label htmlFor="hip">Hip Circumference (cm)</Label>
          <Input
            id="hip"
            type="number"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
          />
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Body Fat Percentage</p>
            <p className="text-4xl font-bold text-primary">{result.bodyFat}%</p>
            <p className={`text-lg font-medium mt-2 ${getCategoryColor(result.category)}`}>
              {result.category}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Lean Body Mass</p>
              <p className="text-xl font-semibold">{result.leanMass} kg</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Fat Mass</p>
              <p className="text-xl font-semibold">{result.fatMass} kg</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-2">Body Fat Categories ({gender === 'male' ? 'Men' : 'Women'}):</p>
            <ul className="space-y-1">
              <li>Essential Fat: {gender === 'male' ? '2-5%' : '10-13%'}</li>
              <li>Athletes: {gender === 'male' ? '6-13%' : '14-20%'}</li>
              <li>Fitness: {gender === 'male' ? '14-17%' : '21-24%'}</li>
              <li>Average: {gender === 'male' ? '18-24%' : '25-31%'}</li>
              <li>Obese: {gender === 'male' ? '25%+' : '32%+'}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
