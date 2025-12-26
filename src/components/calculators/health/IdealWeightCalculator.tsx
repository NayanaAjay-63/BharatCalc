import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [results, setResults] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
  } | null>(null);

  useEffect(() => {
    calculateIdealWeight();
  }, [height, gender]);

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    if (!h || h < 50 || h > 250) {
      setResults(null);
      return;
    }

    // Convert cm to inches for formulas
    const heightInches = h / 2.54;
    const inchesOver5Feet = Math.max(0, heightInches - 60);

    let robinson: number, miller: number, devine: number, hamwi: number;

    if (gender === 'male') {
      // Robinson formula (1983)
      robinson = 52 + 1.9 * inchesOver5Feet;
      // Miller formula (1983)
      miller = 56.2 + 1.41 * inchesOver5Feet;
      // Devine formula (1974)
      devine = 50 + 2.3 * inchesOver5Feet;
      // Hamwi formula (1964)
      hamwi = 48 + 2.7 * inchesOver5Feet;
    } else {
      // Robinson formula (1983)
      robinson = 49 + 1.7 * inchesOver5Feet;
      // Miller formula (1983)
      miller = 53.1 + 1.36 * inchesOver5Feet;
      // Devine formula (1974)
      devine = 45.5 + 2.3 * inchesOver5Feet;
      // Hamwi formula (1964)
      hamwi = 45.5 + 2.2 * inchesOver5Feet;
    }

    setResults({
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      devine: Math.round(devine * 10) / 10,
      hamwi: Math.round(hamwi * 10) / 10,
    });
  };

  const average = results
    ? Math.round(((results.robinson + results.miller + results.devine + results.hamwi) / 4) * 10) / 10
    : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="170"
          min="50"
          max="250"
        />
      </div>

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

      {results && (
        <div className="space-y-4">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Average Ideal Weight</p>
            <p className="text-4xl font-bold text-primary">{average} kg</p>
            <p className="text-sm text-muted-foreground mt-2">
              ({Math.round(average * 2.205)} lbs)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Robinson Formula</p>
              <p className="text-xl font-semibold">{results.robinson} kg</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Miller Formula</p>
              <p className="text-xl font-semibold">{results.miller} kg</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Devine Formula</p>
              <p className="text-xl font-semibold">{results.devine} kg</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Hamwi Formula</p>
              <p className="text-xl font-semibold">{results.hamwi} kg</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            These formulas are estimates and may not apply to all body types. Consult a healthcare provider for personalized advice.
          </p>
        </div>
      )}
    </div>
  );
};
