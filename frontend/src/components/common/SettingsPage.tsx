import { useState, type FC, type ChangeEvent } from 'react';
import { CalibrationPanel } from '../sensors/CalibrationPanel';
import { notifySuccess } from '../../services/notifications';

export const SettingsPage: FC = () => {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [gpsAnonymize, setGpsAnonymize] = useState<boolean>(false);
  const [sampleRate, setSampleRate] = useState<string>('5');
  const [thresholds, setThresholds] = useState<{ [k: string]: string }>({
    co2: '1000',
    pm25: '35',
  });
  const [obdProtocol, setObdProtocol] = useState<string>('auto');
  const [obdPort, setObdPort] = useState<string>('auto');

  const handleThresholdChange = (key: string, value: string) => {
    setThresholds(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    const payload = {
      units,
      gpsAnonymize,
      sampleRate,
      thresholds,
      obd: { protocol: obdProtocol, port: obdPort },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings-export.json';
    a.click();
    URL.revokeObjectURL(url);
    notifySuccess('Settings exported');
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(String(reader.result || '{}'));
        if (json.units) setUnits(json.units);
        if (typeof json.gpsAnonymize === 'boolean') setGpsAnonymize(json.gpsAnonymize);
        if (json.sampleRate) setSampleRate(String(json.sampleRate));
        if (json.thresholds) setThresholds(json.thresholds);
        if (json.obd) {
          if (json.obd.protocol) setObdProtocol(json.obd.protocol);
          if (json.obd.port) setObdPort(json.obd.port);
        }
        notifySuccess('Settings imported');
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.currentTarget.value = '';
  };

  const handleObdConnect = () => {
    notifySuccess(`OBD-II connect requested (${obdProtocol}@${obdPort})`);
  };

  const handleSave = () => {
    notifySuccess('Settings saved');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Settings & Configuration</h2>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Sensor Calibration</h3>
        <p className="text-sm text-muted-foreground mb-2">Zero/span calibration controls for installed sensors.</p>
        <CalibrationPanel />
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Alert Thresholds</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <label className="flex flex-col">
            CO₂ (ppm)
            <input className="input mt-1" value={thresholds.co2} onChange={e => handleThresholdChange('co2', e.target.value)} />
          </label>
          <label className="flex flex-col">
            PM2.5 (µg/m³)
            <input className="input mt-1" value={thresholds.pm25} onChange={e => handleThresholdChange('pm25', e.target.value)} />
          </label>
        </div>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Units</h3>
        <div className="flex items-center gap-4 mt-2">
          <label className="inline-flex items-center">
            <input type="radio" name="units" checked={units === 'metric'} onChange={() => setUnits('metric')} />
            <span className="ml-2">Metric</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="units" checked={units === 'imperial'} onChange={() => setUnits('imperial')} />
            <span className="ml-2">Imperial</span>
          </label>
        </div>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Data Privacy</h3>
        <label className="inline-flex items-center gap-3 mt-2">
          <input type="checkbox" checked={gpsAnonymize} onChange={e => setGpsAnonymize(e.target.checked)} />
          <span>GPS anonymization (truncate/obfuscate precise coordinates)</span>
        </label>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Export / Import</h3>
        <div className="flex items-center gap-3 mt-2">
          <button className="btn" onClick={handleExport}>Export settings</button>
          <label className="btn">
            Import
            <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">OBD-II</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <label className="flex flex-col">
            Protocol
            <input className="input mt-1" value={obdProtocol} onChange={e => setObdProtocol(e.target.value)} />
          </label>
          <label className="flex flex-col">
            Port
            <input className="input mt-1" value={obdPort} onChange={e => setObdPort(e.target.value)} />
          </label>
          <div className="flex items-end">
            <button className="btn" onClick={handleObdConnect}>Connect</button>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Sensor Status & Warm-up</h3>
        <p className="text-sm text-muted-foreground">Displays sensor calibration status and warm-up progress.</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span>Sensor A</span>
              <span className="text-xs text-green-600">Warm</span>
            </div>
            <div className="h-2 bg-gray-200 rounded mt-1">
              <div className="h-2 bg-primary rounded" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span>Sensor B</span>
              <span className="text-xs text-yellow-600">Warming</span>
            </div>
            <div className="h-2 bg-gray-200 rounded mt-1">
              <div className="h-2 bg-primary rounded" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow rounded p-4">
        <h3 className="font-semibold">Sample Rate</h3>
        <div className="mt-2">
          <select className="input" value={sampleRate} onChange={e => setSampleRate(e.target.value)}>
            <option value="1">1 Hz</option>
            <option value="5">5 Hz</option>
            <option value="10">10 Hz</option>
            <option value="50">50 Hz</option>
          </select>
        </div>
      </section>

      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SettingsPage;
