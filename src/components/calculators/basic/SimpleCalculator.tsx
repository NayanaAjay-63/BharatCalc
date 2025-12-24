import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResultDisplay } from '@/components/shared/ResultDisplay';
import { Delete, Plus, Minus, X, Divide, Percent, Equal } from 'lucide-react';

export const SimpleCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue;
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    let newValue: number;

    switch (operation) {
      case '+':
        newValue = previousValue + inputValue;
        break;
      case '-':
        newValue = previousValue - inputValue;
        break;
      case '×':
        newValue = previousValue * inputValue;
        break;
      case '÷':
        newValue = previousValue / inputValue;
        break;
      default:
        return;
    }

    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const buttonClass = "h-14 text-lg font-medium transition-all duration-150 active:scale-95";

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <p className="text-sm text-muted-foreground text-center">Quick everyday math, done instantly.</p>
      
      <div className="bg-secondary rounded-xl p-4">
        <div className="text-right">
          {previousValue !== null && operation && (
            <p className="text-sm text-muted-foreground">
              {previousValue} {operation}
            </p>
          )}
          <p className="text-4xl font-bold tabular-nums truncate">{display}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button variant="secondary" className={buttonClass} onClick={clear}>AC</Button>
        <Button variant="secondary" className={buttonClass} onClick={toggleSign}>±</Button>
        <Button variant="secondary" className={buttonClass} onClick={inputPercent}>%</Button>
        <Button variant="swiss-outline" className={buttonClass} onClick={() => performOperation('÷')}>÷</Button>

        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('7')}>7</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('8')}>8</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('9')}>9</Button>
        <Button variant="swiss-outline" className={buttonClass} onClick={() => performOperation('×')}>×</Button>

        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('4')}>4</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('5')}>5</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('6')}>6</Button>
        <Button variant="swiss-outline" className={buttonClass} onClick={() => performOperation('-')}>−</Button>

        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('1')}>1</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('2')}>2</Button>
        <Button variant="outline" className={buttonClass} onClick={() => inputDigit('3')}>3</Button>
        <Button variant="swiss-outline" className={buttonClass} onClick={() => performOperation('+')}>+</Button>

        <Button variant="outline" className={`${buttonClass} col-span-2`} onClick={() => inputDigit('0')}>0</Button>
        <Button variant="outline" className={buttonClass} onClick={inputDecimal}>.</Button>
        <Button variant="swiss" className={buttonClass} onClick={calculate}>=</Button>
      </div>
    </div>
  );
};
