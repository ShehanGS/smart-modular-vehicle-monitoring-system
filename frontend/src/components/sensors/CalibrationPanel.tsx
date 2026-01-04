import { useState } from 'react';
import { notifySuccess } from '@services/notifications';
import { CalibrationWizard } from './CalibrationWizard';
import { Settings, Wrench } from 'lucide-react';

export const CalibrationPanel = () => {
  const [mode, setMode] = useState<'quick' | 'wizard'>('quick');
  const [span, setSpan] = useState(1.0);
  const [tempComp, setTempComp] = useState(0);

  if (mode === 'wizard') {
    return (
      <div className="col-span-1 lg:col-span-2">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="font-semibold">Advanced Calibration</h3>
          <button onClick={() => setMode('quick')} className="text-sm underline text-neutral">Back to Quick View</button>
        </div>
        <CalibrationWizard />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Quick Calibration</h3>
        </div>
        <button onClick={() => setMode('wizard')} className="text-xs btn px-2 py-1 h-auto">
          Open Wizard
        </button>
      </div>

      <div className="grid gap-4">
        <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-lg flex gap-2">
          <Settings className="h-4 w-4 shrink-0" />
          <p>Use Quick Mode for minor offset adjustments. For full sensor recalibration, use the Wizard.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 transition-colors" onClick={() => notifySuccess('Zero calibration sent')}>
            Zero Calibration (Air)
          </button>
          <button
            className="rounded-lg bg-primary text-white px-4 py-2 text-sm hover:bg-primary/90 transition-colors"
            onClick={() => notifySuccess('Calibration saved')}
          >
            Save Adjustments
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm grid gap-1">
            Span Factor
            <input
              type="number"
              step="0.01"
              className="input"
              value={span}
              onChange={(e) => setSpan(Number(e.target.value))}
            />
          </label>
          <label className="text-sm grid gap-1">
            Temp. Comp. (°C)
            <input
              type="number"
              className="input"
              value={tempComp}
              onChange={(e) => setTempComp(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

