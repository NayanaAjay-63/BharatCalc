import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths, addYears, subYears } from 'date-fns';

export const AddSubtractDaysCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [days, setDays] = useState('0');
  const [weeks, setWeeks] = useState('0');
  const [months, setMonths] = useState('0');
  const [years, setYears] = useState('0');
  const [result, setResult] = useState<Date | null>(null);

  useEffect(() => {
    calculate();
  }, [startDate, operation, days, weeks, months, years]);

  const calculate = () => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      setResult(null);
      return;
    }

    const d = parseInt(days) || 0;
    const w = parseInt(weeks) || 0;
    const m = parseInt(months) || 0;
    const y = parseInt(years) || 0;

    let resultDate = start;

    if (operation === 'add') {
      resultDate = addYears(resultDate, y);
      resultDate = addMonths(resultDate, m);
      resultDate = addWeeks(resultDate, w);
      resultDate = addDays(resultDate, d);
    } else {
      resultDate = subYears(resultDate, y);
      resultDate = subMonths(resultDate, m);
      resultDate = subWeeks(resultDate, w);
      resultDate = subDays(resultDate, d);
    }

    setResult(resultDate);
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Operation</Label>
        <RadioGroup
          value={operation}
          onValueChange={(v) => setOperation(v as 'add' | 'subtract')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="add" id="add" />
            <Label htmlFor="add" className="cursor-pointer">Add (+)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subtract" id="subtract" />
            <Label htmlFor="subtract" className="cursor-pointer">Subtract (−)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="years">Years</Label>
          <Input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="months">Months</Label>
          <Input
            id="months"
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weeks">Weeks</Label>
          <Input
            id="weeks"
            type="number"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="days">Days</Label>
          <Input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min="0"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Result Date</p>
            <p className="text-3xl font-bold text-primary">
              {format(result, 'MMMM d, yyyy')}
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              {getDayOfWeek(result)}
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              {operation === 'add' ? 'Adding' : 'Subtracting'}{' '}
              {years !== '0' && `${years} year${years !== '1' ? 's' : ''}, `}
              {months !== '0' && `${months} month${months !== '1' ? 's' : ''}, `}
              {weeks !== '0' && `${weeks} week${weeks !== '1' ? 's' : ''}, `}
              {days} day{days !== '1' ? 's' : ''}{' '}
              {operation === 'add' ? 'to' : 'from'} {format(new Date(startDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
