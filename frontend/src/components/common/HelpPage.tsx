import { useState } from 'react';
import { Book, Shield, AlertTriangle, HelpCircle, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const faq = [
    { q: "How often should I calibrate the sensors?", a: "We recommend a zero calibration before every critical trip (warm-up required) and a full span calibration every 3 months." },
    { q: "What does 'Drift Warning' mean?", a: "It indicates the sensor readings have deviated significantly from the expected baseline. Perform a calibration immediately." },
    { q: "How do I export trip data?", a: "Go to the Trip Analysis page after a trip, or use the Reports Generator for bulk exports." }
];

export const HelpPage = () => {
    const [activeTab, setActiveTab] = useState('guide');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-xl border shadow-sm text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Help & Documentation</h1>
                <p className="text-slate-500">Guides, safety info, and support for the Eco-Driving System.</p>

                <div className="flex justify-center gap-4 mt-6">
                    {['guide', 'safety', 'faq', 'contact'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border shadow-sm min-h-[400px]">
                {activeTab === 'guide' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Book className="h-6 w-6 text-primary" />
                            <h2 className="text-xl font-bold">User Guide</h2>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <h3>Sensor Placement</h3>
                            <p>Correct sensor placement is critical for accurate readings.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>NOx Sensor:</strong> Install downstream of the catalytic converter.</li>
                                <li><strong>PM2.5 Sensor:</strong> Mount in the exhaust tailpipe probe adapter.</li>
                                <li><strong>Cabin Sensor:</strong> Place on the dashboard away from direct vents.</li>
                            </ul>

                            <div className="my-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-4">
                                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <HelpCircle className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-900">Need installation help?</h4>
                                    <p className="text-sm text-blue-700">Check the technical manual PDF for detailed diagrams.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-6 w-6 text-danger" />
                            <h2 className="text-xl font-bold">Safety Warnings</h2>
                        </div>

                        <div className="grid gap-4">
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex gap-3">
                                <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-red-900">High Temperature Hazard</h4>
                                    <p className="text-sm text-red-700">Exhaust probes can reach temperatures over 300°C. Do not touch during or immediately after operation.</p>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-3">
                                <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-yellow-900">Calibration Gases</h4>
                                    <p className="text-sm text-yellow-700">Ensure proper ventilation when using span gases (NO, CO). Store cylinders securely.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                        {faq.map((item, i) => (
                            <div key={i} className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4 text-primary" /> {item.q}
                                </h4>
                                <p className="text-slate-600 ml-6">{item.a}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="text-center py-12">
                        <Phone className="h-12 w-12 mx-auto text-primary mb-4" />
                        <h2 className="text-xl font-bold mb-2">Contact Support</h2>
                        <p className="text-slate-500 mb-6">Technical support is available Mon-Fri, 9am - 5pm EST.</p>
                        <div className="inline-block bg-slate-50 px-8 py-4 rounded-xl border">
                            <p className="font-mono text-lg font-bold">support@eco-system.com</p>
                            <p className="text-sm text-slate-400 mt-1">+1 (800) 555-0123</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
