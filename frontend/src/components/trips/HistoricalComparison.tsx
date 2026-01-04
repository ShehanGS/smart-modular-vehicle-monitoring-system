import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import type { TripReport } from '@/types';

interface HistoricalComparisonProps {
  current: TripReport;
  historical: {
    avg_eco_score: number;
    avg_fuel_consumption: number;
    avg_emissions: {
      co2: number;
      nox: number;
      pm25: number;
    };
  };
}

export const HistoricalComparison = ({ current, historical }: HistoricalComparisonProps) => {
  const ecoScoreDiff = current.eco_score.composite - historical.avg_eco_score;
  const fuelDiff = current.statistics.fuel_consumed_l - historical.avg_fuel_consumption;
  const co2Diff = current.emissions.co2_total_g - historical.avg_emissions.co2;
  const noxDiff = current.emissions.nox_avg_ppb - historical.avg_emissions.nox;
  const pm25Diff = current.emissions.pm25_avg_ug_m3 - historical.avg_emissions.pm25;

  const ComparisonItem = ({ label, current, historical, unit, isLowerBetter = false }: {
    label: string;
    current: number;
    historical: number;
    unit: string;
    isLowerBetter?: boolean;
  }) => {
    const diff = current - historical;
    const percentChange = ((diff / historical) * 100).toFixed(1);
    const isImprovement = isLowerBetter ? diff < 0 : diff > 0;

    return (
      <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
        <div className="text-sm text-neutral mb-2">{label}</div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xl font-bold">{current.toFixed(1)} {unit}</div>
            <div className="text-xs text-neutral">vs {historical.toFixed(1)} {unit} avg</div>
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            isImprovement ? 'text-success' : diff === 0 ? 'text-neutral' : 'text-danger'
          }`}>
            {diff > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : diff < 0 ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
            {Math.abs(parseFloat(percentChange)).toFixed(1)}%
          </div>
        </div>
        <div className={`text-xs px-2 py-1 rounded ${
          isImprovement ? 'bg-success/10 text-success' : diff === 0 ? 'bg-slate-100 text-neutral' : 'bg-danger/10 text-danger'
        }`}>
          {isImprovement ? 'Better' : diff === 0 ? 'Same' : 'Worse'} than historical average
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Historical Comparison</h2>
      </div>
      <p className="text-sm text-neutral mb-4">
        Comparison to your historical trip averages
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <ComparisonItem
          label="Eco-Score"
          current={current.eco_score.composite}
          historical={historical.avg_eco_score}
          unit=""
          isLowerBetter={false}
        />
        <ComparisonItem
          label="Fuel Consumption"
          current={current.statistics.fuel_consumed_l}
          historical={historical.avg_fuel_consumption}
          unit="L"
          isLowerBetter={true}
        />
        <ComparisonItem
          label="CO₂ Emissions"
          current={current.emissions.co2_total_g}
          historical={historical.avg_emissions.co2}
          unit="g"
          isLowerBetter={true}
        />
        <ComparisonItem
          label="NOx Average"
          current={current.emissions.nox_avg_ppb}
          historical={historical.avg_emissions.nox}
          unit="ppb"
          isLowerBetter={true}
        />
        <ComparisonItem
          label="PM2.5 Average"
          current={current.emissions.pm25_avg_ug_m3}
          historical={historical.avg_emissions.pm25}
          unit="μg/m³"
          isLowerBetter={true}
        />
      </div>
    </div>
  );
};

