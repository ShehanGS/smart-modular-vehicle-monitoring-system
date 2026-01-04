export const ImpactVisualization = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="font-semibold mb-2">Environmental Impact</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
        <p className="font-semibold">CO₂ Offset</p>
        <p className="text-2xl font-bold text-primary">18 trees</p>
        <p className="text-xs text-neutral">to offset this trip</p>
      </div>
      <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
        <p className="font-semibold">Health Impact</p>
        <p className="text-2xl font-bold text-danger">Moderate</p>
        <p className="text-xs text-neutral">PM2.5 exposure is elevated</p>
      </div>
    </div>
  </div>
);

