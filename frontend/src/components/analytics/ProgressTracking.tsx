import { Target, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import type { Trip } from '@/types';

interface ProgressTrackingProps {
  trips: Trip[];
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  description: string;
}

export const ProgressTracking = ({ trips }: ProgressTrackingProps) => {
  const validTrips = trips.filter(t => t.eco_score && t.distance_km && t.fuel_used_l);
  
  // Calculate current progress
  const avgEcoScore = validTrips.length > 0
    ? validTrips.reduce((sum, t) => sum + (t.eco_score || 0), 0) / validTrips.length
    : 0;

  const totalDistance = validTrips.reduce((sum, t) => sum + (t.distance_km || 0), 0);
  
  const avgFuelEff = validTrips.length > 0
    ? validTrips
        .filter(t => t.distance_km && t.fuel_used_l)
        .reduce((sum, t) => {
          const eff = ((t.fuel_used_l || 0) / (t.distance_km || 1)) * 100;
          return sum + eff;
        }, 0) / validTrips.filter(t => t.distance_km && t.fuel_used_l).length
    : 0;

  const totalEmissions = validTrips.reduce((sum, t) => 
    sum + ((t.fuel_used_l || 0) * 2.31), 0
  );

  // Define goals
  const goals: Goal[] = [
    {
      id: 'eco-score',
      title: 'Achieve 85+ Eco-Score',
      target: 85,
      current: avgEcoScore,
      unit: '',
      description: 'Maintain excellent eco-driving performance'
    },
    {
      id: 'fuel-efficiency',
      title: 'Improve Fuel Efficiency',
      target: 7.5,
      current: avgFuelEff,
      unit: 'L/100km',
      description: 'Target: Below 7.5 L/100km average'
    },
    {
      id: 'distance',
      title: 'Drive 500 km',
      target: 500,
      current: totalDistance,
      unit: 'km',
      description: 'Accumulate distance for better data'
    },
    {
      id: 'emissions',
      title: 'Reduce Emissions',
      target: 100,
      current: totalEmissions,
      unit: 'kg CO₂',
      description: 'Keep total emissions below 100 kg'
    }
  ];

  const getProgress = (current: number, target: number, isLowerBetter: boolean = false) => {
    if (isLowerBetter) {
      // For fuel efficiency and emissions, lower is better
      const progress = Math.min((target / current) * 100, 100);
      return { percentage: progress, achieved: current <= target };
    } else {
      // For eco-score and distance, higher is better
      const progress = Math.min((current / target) * 100, 100);
      return { percentage: progress, achieved: current >= target };
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Progress Tracking</h2>
      </div>
      <p className="text-sm text-neutral mb-6">
        Track your progress toward eco-driving goals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const isLowerBetter = goal.id === 'fuel-efficiency' || goal.id === 'emissions';
          const progress = getProgress(goal.current, goal.target, isLowerBetter);
          const isAchieved = progress.achieved;

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-lg border-2 ${
                isAchieved
                  ? 'border-success bg-success/5'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{goal.title}</h3>
                    {isAchieved && (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <p className="text-xs text-neutral">{goal.description}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral">Progress</span>
                  <span className="font-semibold">
                    {goal.current.toFixed(1)} {goal.unit} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isAchieved ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-neutral mt-1">
                  {progress.percentage.toFixed(0)}% complete
                </div>
              </div>

              {isAchieved ? (
                <div className="flex items-center gap-2 text-success text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">Goal achieved! 🎉</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-neutral text-sm">
                  <Circle className="h-4 w-4" />
                  <span>
                    {isLowerBetter
                      ? `Need to reduce by ${(goal.current - goal.target).toFixed(1)} ${goal.unit}`
                      : `Need ${(goal.target - goal.current).toFixed(1)} more ${goal.unit}`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

