'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressItem {
  id: string;
  label: string;
  value: number;
  target: number;
}

const initialProgressData: ProgressItem[] = [
  { id: 'cost', label: 'Cost Optimization', value: 0, target: 75 },
  { id: 'security', label: 'Security Hardening', value: 0, target: 90 },
  { id: 'performance', label: 'Performance Efficiency', value: 0, target: 60 },
  { id: 'reliability', label: 'Reliability Improvement', value: 0, target: 80 },
];

export default function OptimizationProgress() {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);

  useEffect(() => {
    const timers = progressData.map(item => 
      setTimeout(() => {
        setProgressData(prevData => 
          prevData.map(p => p.id === item.id ? { ...p, value: item.target } : p)
        );
      }, 500) // Simulate loading
    );
    return () => timers.forEach(clearTimeout);
  }, []);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Optimization Progress</CardTitle>
        <CardDescription>Current status of key optimization areas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {progressData.map((item) => (
          <div key={item.id}>
            <div className="mb-1 flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.value}% Complete</span>
            </div>
            <Progress value={item.value} aria-label={`${item.label} progress`} className="h-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
