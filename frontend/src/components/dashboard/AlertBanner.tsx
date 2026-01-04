import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  warnings: Array<{ type: 'danger' | 'warning'; message: string }>;
}

export const AlertBanner = ({ warnings }: AlertBannerProps) => {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  if (warnings.length === 0 || dismissed.size === warnings.length) {
    return null;
  }

  const visibleWarnings = warnings.filter((_, idx) => !dismissed.has(idx));

  return (
    <div className="space-y-2">
      {visibleWarnings.map((warning, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
            warning.type === 'danger'
              ? 'bg-danger/10 border-danger text-danger'
              : 'bg-warning/10 border-warning text-warning'
          }`}
        >
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-sm">{warning.message}</p>
          </div>
          <button
            onClick={() => setDismissed((prev) => new Set([...prev, idx]))}
            className="flex-shrink-0 text-current opacity-70 hover:opacity-100"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

