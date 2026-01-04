import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

interface EcoScoreComparisonProps {
  ecoScore: {
    composite: number;
    baseline: number;
    improvement: number;
    breakdown: {
      acceleration: number;
      speed: number;
      idling: number;
      emissions: number;
    };
  };
}

export const EcoScoreComparison = ({ ecoScore }: EcoScoreComparisonProps) => {
  const improvement = ecoScore.composite - ecoScore.baseline;
  const improvementPercent = ((improvement / ecoScore.baseline) * 100).toFixed(1);
  const isImprovement = improvement > 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Eco-Score Analysis</h2>
      
      {/* Main Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
          <div className="text-sm text-neutral mb-1">Composite Score</div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(ecoScore.composite)}`}>
            {ecoScore.composite}
          </div>
          <div className="text-xs text-neutral">/ 100</div>
        </div>
        
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
          <div className="text-sm text-neutral mb-1">Baseline</div>
          <div className="text-4xl font-bold mb-2 text-neutral">
            {ecoScore.baseline}
          </div>
          <div className="text-xs text-neutral">Average historical</div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isImprovement ? 'border-success bg-success/5' : 'border-danger bg-danger/5'
        }`}>
          <div className="text-sm text-neutral mb-1">Improvement</div>
          <div className={`text-4xl font-bold mb-2 flex items-center gap-2 ${
            isImprovement ? 'text-success' : 'text-danger'
          }`}>
            {isImprovement ? (
              <TrendingUp className="h-6 w-6" />
            ) : (
              <TrendingDown className="h-6 w-6" />
            )}
            {isImprovement ? '+' : ''}{improvementPercent}%
          </div>
          <div className="text-xs text-neutral">
            {isImprovement ? 'Better than baseline' : 'Below baseline'}
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Score Breakdown
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(ecoScore.breakdown).map(([key, score]) => (
            <div key={key} className="p-3 rounded-lg border border-slate-200">
              <div className="text-xs text-neutral mb-2 capitalize">{key}</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreBgColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

