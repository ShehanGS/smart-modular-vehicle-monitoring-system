import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';
import type { LiveSensorData } from '@/types';

interface EcoTipsProps {
  currentData: LiveSensorData;
}

export const EcoTips = ({ currentData }: EcoTipsProps) => {
  const tips: Array<{ message: string; impact: string; icon: JSX.Element }> = [];

  // Generate contextual tips based on current data
  if (currentData.throttle_pct > 70) {
    const expectedDrop = Math.round((currentData.throttle_pct - 50) * 0.15);
    tips.push({
      message: `Ease off throttle — expected NOx drop ${expectedDrop}%`,
      impact: 'High impact',
      icon: <TrendingDown className="h-4 w-4 text-success" />
    });
  }

  if (currentData.rpm > 4000) {
    tips.push({
      message: 'Shift to higher gear to reduce RPM and improve fuel efficiency',
      impact: 'Medium impact',
      icon: <TrendingDown className="h-4 w-4 text-success" />
    });
  }

  if (currentData.speed_kmh > 80 && currentData.eco_score < 75) {
    tips.push({
      message: 'Reduce speed by 10 km/h to improve eco-score and reduce emissions',
      impact: 'High impact',
      icon: <TrendingDown className="h-4 w-4 text-success" />
    });
  }

  if (currentData.nox_ppb > 60) {
    const reduction = Math.round((currentData.nox_ppb - 40) * 0.2);
    tips.push({
      message: `Smooth acceleration can reduce NOx by up to ${reduction}%`,
      impact: 'High impact',
      icon: <TrendingDown className="h-4 w-4 text-success" />
    });
  }

  if (currentData.eco_score >= 85) {
    tips.push({
      message: 'Excellent driving! Maintain this eco-friendly pace',
      impact: 'Positive',
      icon: <TrendingUp className="h-4 w-4 text-success" />
    });
  }

  if (tips.length === 0) {
    tips.push({
      message: 'Continue maintaining steady speed and smooth acceleration',
      impact: 'Good',
      icon: <Lightbulb className="h-4 w-4 text-primary" />
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Eco-Driving Tips</h3>
      </div>
      <div className="space-y-2">
        {tips.slice(0, 3).map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
          >
            {tip.icon}
            <div className="flex-1">
              <p className="text-sm font-medium">{tip.message}</p>
              <p className="text-xs text-neutral mt-1">{tip.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

