import { useState } from 'react';
import { FileText, Download, Calendar, Mail } from 'lucide-react';
import { notifySuccess } from '../../services/notifications';

const reportTypes = [
    { id: 'daily', name: 'Daily Compliance Report', icon: FileText },
    { id: 'emissions', name: 'Emissions Summary', icon: Activity },
    { id: 'driver', name: 'Driver Scorecard', icon: FileText },
    { id: 'vehicle', name: 'Vehicle Usage Log', icon: FileText }
];

import { Activity } from 'lucide-react';

export const ReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState('daily');
    const [dateRange, setDateRange] = useState('last7days');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            notifySuccess('Report generated successfully');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Reports & Archives</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Report Configuration Form */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-4">Report Settings</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Report Type</label>
                                <select
                                    className="input mt-1"
                                    value={selectedReport}
                                    onChange={(e) => setSelectedReport(e.target.value)}
                                >
                                    {reportTypes.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Time Period</label>
                                <select
                                    className="input mt-1"
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <option value="today">Today</option>
                                    <option value="yesterday">Yesterday</option>
                                    <option value="last7days">Last 7 Days</option>
                                    <option value="last30days">Last 30 Days</option>
                                    <option value="custom">Custom Range...</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Filter By</label>
                                <div className="mt-2 text-sm text-slate-500">
                                    <label className="flex items-center gap-2 mb-1">
                                        <input type="checkbox" defaultChecked /> All Vehicles
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" defaultChecked /> All Drivers
                                    </label>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary w-full mt-2"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : 'Generate New Report'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview / Archive */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-xl border shadow-sm h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold">Preview</h3>
                            <div className="flex gap-2">
                                <button className="btn text-xs py-1 h-8" onClick={() => notifySuccess('Email scheduled')}>
                                    <Mail className="h-3 w-3 mr-1" /> Schedule Email
                                </button>
                                <button className="btn text-xs py-1 h-8 bg-slate-100" onClick={() => notifySuccess('PDF Downloaded')}>
                                    <Download className="h-3 w-3 mr-1" /> Download PDF
                                </button>
                            </div>
                        </div>

                        {/* Mock PDF Preview Area */}
                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-8 flex flex-col items-center shadow-inner">
                            <div className="w-full max-w-lg bg-white shadow-lg p-8 min-h-[400px] border border-slate-100 flex flex-col">
                                <div className="border-b pb-4 mb-4 flex justify-between items-start">
                                    <div>
                                        <h1 className="text-xl font-bold text-slate-800">Compliance Report</h1>
                                        <p className="text-xs text-slate-500">Generated: {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <div className="h-8 w-8 bg-primary/20 rounded-md"></div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="h-4 bg-slate-100 w-3/4 rounded"></div>
                                    <div className="h-4 bg-slate-100 w-full rounded"></div>
                                    <div className="h-4 bg-slate-100 w-5/6 rounded"></div>
                                    <div className="mt-8 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Trips Analyzed</span>
                                            <span className="font-mono">142</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Avg. CO2 Emission</span>
                                            <span className="font-mono text-green-600">112 g/km</span>
                                        </div>
                                        <div className="h-px bg-slate-100 my-2"></div>
                                        <div className="h-32 bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
                                            Chart Placeholder
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t text-center text-xs text-slate-400">
                                    Page 1 of 1 • Eco Driving System
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
