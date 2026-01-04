import { ReactNode } from 'react';

export const MetricsCard = ({
  title,
  value,
  subtitle,
  icon
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-neutral">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary">{icon}</div>
    </div>
    {subtitle && <p className="text-xs text-neutral mt-2">{subtitle}</p>}
  </div>
);

