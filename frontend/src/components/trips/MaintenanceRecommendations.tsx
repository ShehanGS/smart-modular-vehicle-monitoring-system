import { AlertCircle, Wrench, Fuel, Car, CheckCircle2 } from 'lucide-react';

interface MaintenanceRecommendationsProps {
  recommendations: Array<{
    type: 'engine' | 'emissions' | 'driving' | 'fuel';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    action: string;
  }>;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'engine':
      return <Wrench className="h-4 w-4" />;
    case 'emissions':
      return <AlertCircle className="h-4 w-4" />;
    case 'driving':
      return <Car className="h-4 w-4" />;
    case 'fuel':
      return <Fuel className="h-4 w-4" />;
    default:
      return <CheckCircle2 className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-danger bg-danger/5 text-danger';
    case 'medium':
      return 'border-warning bg-warning/5 text-warning';
    case 'low':
      return 'border-primary bg-primary/5 text-primary';
    default:
      return 'border-slate-200 bg-slate-50 text-neutral';
  }
};

export const MaintenanceRecommendations = ({ recommendations }: MaintenanceRecommendationsProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Maintenance Recommendations</h2>
        <div className="text-center py-8 text-neutral">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-success" />
          <p className="font-medium">No maintenance recommendations at this time</p>
          <p className="text-sm mt-1">Your vehicle is performing well!</p>
        </div>
      </div>
    );
  }

  // Sort by priority
  const sorted = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Maintenance Recommendations</h2>
      <p className="text-sm text-neutral mb-4">
        Based on detected patterns and driving behavior analysis
      </p>
      <div className="space-y-3">
        {sorted.map((rec, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getTypeIcon(rec.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/50">
                    {rec.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-sm mb-2 opacity-90">{rec.description}</p>
                <div className="mt-2 p-2 rounded bg-white/50 border border-white/50">
                  <p className="text-xs font-medium mb-1">Recommended Action:</p>
                  <p className="text-xs">{rec.action}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

