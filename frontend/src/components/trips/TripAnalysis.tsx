import { useState } from 'react';
import { TripReplay } from './TripReplay';
import { RealTimeChart } from '../sensors/RealTimeChart';
import { Download, Map as MapIcon, Table as TableIcon, Activity } from 'lucide-react';

// Mock large dataset for a trip
const generateTripData = () => {
    const data = [];
    for (let i = 0; i < 300; i++) {
        data.push({
            timestamp: i,
            speed_kmh: 40 + Math.sin(i / 10) * 20 + Math.random() * 5,
            rpm: 2000 + Math.sin(i / 10) * 500,
            co2_ppm: 400 + Math.cos(i / 20) * 50,
            nox_ppb: 20 + Math.random() * 10,
        });
    }
    return data;
};

const fullTripData = generateTripData();

export const TripAnalysis = () => {
    const [cursor, setCursor] = useState(0);
    const [view, setView] = useState<'charts' | 'table'>('charts');

    // Slice data up to current cursor for "replay" effect if desired, 
    // or show full data with a reference line (simplified here to full data)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Trip Analysis: TR-2024-001</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView('charts')}
                        className={`p-2 rounded ${view === 'charts' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}
                    >
                        <Activity className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setView('table')}
                        className={`p-2 rounded ${view === 'table' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}
                    >
                        <TableIcon className="h-5 w-5" />
                    </button>
                    <button className="btn items-center gap-2">
                        <Download className="h-4 w-4" /> Export CSV
                    </button>
                </div>
            </div>

            <TripReplay durationSeconds={300} onTimeUpdate={setCursor} />

            {view === 'charts' ? (
                <div className="grid gap-6">
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-2">Speed & RPM Profile</h3>
                        <RealTimeChart data={fullTripData} dataKeys={['speed_kmh', 'rpm']} />
                    </div>
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-2">Emissions Correlation</h3>
                        <RealTimeChart data={fullTripData} dataKeys={['co2_ppm', 'nox_ppb']} />
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="px-4 py-3">Time (s)</th>
                                <th className="px-4 py-3">Speed (km/h)</th>
                                <th className="px-4 py-3">RPM</th>
                                <th className="px-4 py-3">CO2 (ppm)</th>
                                <th className="px-4 py-3">NOx (ppb)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {fullTripData.map((row) => (
                                <tr key={row.timestamp} className={row.timestamp === cursor ? 'bg-blue-50' : ''}>
                                    <td className="px-4 py-2">{row.timestamp}</td>
                                    <td className="px-4 py-2">{row.speed_kmh.toFixed(1)}</td>
                                    <td className="px-4 py-2">{row.rpm.toFixed(0)}</td>
                                    <td className="px-4 py-2">{row.co2_ppm.toFixed(1)}</td>
                                    <td className="px-4 py-2">{row.nox_ppb.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
