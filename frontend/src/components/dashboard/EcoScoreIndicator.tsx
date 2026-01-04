import { Leaf } from 'lucide-react';

interface EcoScoreIndicatorProps {
  score: number;
}

export const EcoScoreIndicator = ({ score }: EcoScoreIndicatorProps) => {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Eco-Score</h3>
      </div>
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold" style={{ color }}>
            {Math.round(score)}
          </div>
          <div className="text-xs text-neutral">/ 100</div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className={`text-xs font-semibold ${score >= 80 ? 'text-success' : score >= 60 ? 'text-warning' : 'text-danger'}`}>
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
        </div>
      </div>
    </div>
  );
};

