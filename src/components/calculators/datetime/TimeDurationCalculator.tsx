import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const TimeDurationCalculator: React.FC = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:30');
  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalMinutes: number;
    totalSeconds: number;
    totalHours: number;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [startTime, endTime]);

  const calculate = () => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    if (isNaN(startHour) || isNaN(startMin) || isNaN(endHour) || isNaN(endMin)) {
      setResult(null);
      return;
    }

    let startTotalMinutes = startHour * 60 + startMin;
    let endTotalMinutes = endHour * 60 + endMin;

    // Handle overnight (if end time is before start time, assume next day)
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    const diffMinutes = endTotalMinutes - startTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setResult({
      hours,
      minutes,
      seconds: 0,
      totalMinutes: diffMinutes,
      totalSeconds: diffMinutes * 60,
      totalHours: Math.round((diffMinutes / 60) * 100) / 100,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="text-center p-6 bg-accent/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Duration</p>
            <p className="text-4xl font-bold text-primary">
              {result.hours}h {result.minutes}m
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-xl font-semibold">{result.totalHours}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Minutes</p>
              <p className="text-xl font-semibold">{result.totalMinutes}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Seconds</p>
              <p className="text-xl font-semibold">{result.totalSeconds}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Note: If end time is earlier than start time, duration is calculated assuming the next day.
          </p>
        </div>
      )}
    </div>
  );
};
