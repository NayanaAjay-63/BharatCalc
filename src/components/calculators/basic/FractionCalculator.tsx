import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResultDisplay } from '@/components/shared/ResultDisplay';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

const simplifyFraction = (num: number, den: number): { numerator: number; denominator: number } => {
  if (den === 0) return { numerator: num, denominator: den };
  const divisor = gcd(num, den);
  let newNum = num / divisor;
  let newDen = den / divisor;
  if (newDen < 0) {
    newNum = -newNum;
    newDen = -newDen;
  }
  return { numerator: newNum, denominator: newDen };
};

export const FractionCalculator: React.FC = () => {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<{ numerator: number; denominator: number } | null>(null);

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) {
      setResult(null);
      return;
    }

    let resNum = 0;
    let resDen = 1;

    switch (operation) {
      case 'add':
        resNum = n1 * d2 + n2 * d1;
        resDen = d1 * d2;
        break;
      case 'subtract':
        resNum = n1 * d2 - n2 * d1;
        resDen = d1 * d2;
        break;
      case 'multiply':
        resNum = n1 * n2;
        resDen = d1 * d2;
        break;
      case 'divide':
        if (n2 === 0) {
          setResult(null);
          return;
        }
        resNum = n1 * d2;
        resDen = d1 * n2;
        break;
    }

    setResult(simplifyFraction(resNum, resDen));
  };

  const operationSymbol = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        {/* First Fraction */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground">First Fraction</h3>
          <div className="space-y-2">
            <Label htmlFor="num1">Numerator</Label>
            <Input
              id="num1"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="den1">Denominator</Label>
            <Input
              id="den1"
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              placeholder="1"
            />
          </div>
        </div>

        {/* Second Fraction */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground">Second Fraction</h3>
          <div className="space-y-2">
            <Label htmlFor="num2">Numerator</Label>
            <Input
              id="num2"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="den2">Denominator</Label>
            <Input
              id="den2"
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Operation</Label>
        <Select value={operation} onValueChange={(v) => setOperation(v as Operation)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">Add (+)</SelectItem>
            <SelectItem value="subtract">Subtract (−)</SelectItem>
            <SelectItem value="multiply">Multiply (×)</SelectItem>
            <SelectItem value="divide">Divide (÷)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={calculate} className="w-full" variant="swiss">
        Calculate
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              {num1 || 0}/{den1 || 1} {operationSymbol[operation]} {num2 || 0}/{den2 || 1} =
            </p>
            <p className="text-4xl font-bold text-primary">
              {result.denominator === 1 ? result.numerator : `${result.numerator}/${result.denominator}`}
            </p>
            {result.denominator !== 1 && result.denominator !== 0 && (
              <p className="text-lg text-muted-foreground mt-2">
                ≈ {(result.numerator / result.denominator).toFixed(4)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
