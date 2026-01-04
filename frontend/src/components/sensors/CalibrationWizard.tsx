import { useState } from 'react';
import { Check, ChevronRight, RotateCcw, Save } from 'lucide-react';
import { notifySuccess } from '../../services/notifications';

const steps = [
    'Preparation',
    'Zero Calibration',
    'Span Calibration',
    'Validation',
    'Finish'
];

export const CalibrationWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [spanValue, setSpanValue] = useState('1000');

    const runCalibration = () => {
        setIsCalibrating(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsCalibrating(false);
                    return 100;
                }
                return prev + 5; // Simulate 2 seconds (5 * 20)
            });
        }, 100);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setProgress(0);
        } else {
            notifySuccess('Calibration Profile Saved!');
            setCurrentStep(0); // Reset or close
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: return (
                <div className="space-y-4">
                    <p className="text-slate-600">This wizard will guide you through the sensor calibration process for <strong>CO₂ Sensor (Pro)</strong>.</p>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-slate-500">
                        <li>Ensure the sensor has warmed up for at least 15 minutes.</li>
                        <li>Have your Zero Air and Span Gas referencing cylinders ready.</li>
                        <li>Maintain stable ambient temperature.</li>
                    </ul>
                </div>
            );
            case 1: return (
                <div className="space-y-4">
                    <p className="font-medium">Step 1: Zero Calibration</p>
                    <p className="text-sm text-slate-500">Expose the sensor to Zero Air (N2 or Clean Air) for 2 minutes until readings stabilize.</p>

                    {isCalibrating ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Calibrating Zero Point...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : progress === 100 ? (
                        <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4" /> Zero Point Set Successfully
                        </div>
                    ) : (
                        <button className="btn btn-primary w-full" onClick={runCalibration}>Start Zero Calibration</button>
                    )}
                </div>
            );
            case 2: return (
                <div className="space-y-4">
                    <p className="font-medium">Step 2: Span Calibration</p>
                    <label className="block text-sm">
                        Reference Gas Value (ppm)
                        <input className="input mt-1" value={spanValue} onChange={e => setSpanValue(e.target.value)} />
                    </label>
                    <p className="text-sm text-slate-500">Expose sensor to target gas. Wait for stability.</p>

                    {isCalibrating ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Calibrating Span...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : progress === 100 ? (
                        <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4" /> Span Point Set Successfully
                        </div>
                    ) : (
                        <button className="btn btn-primary w-full" onClick={runCalibration}>Start Span Calibration</button>
                    )}
                </div>
            );
            case 3: return (
                <div className="space-y-4">
                    <p className="font-medium">Validation</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded border">
                            <div className="text-xs text-slate-500">Before</div>
                            <div className="font-mono text-lg text-slate-400">412 ppm</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border border-blue-100">
                            <div className="text-xs text-blue-600">After</div>
                            <div className="font-mono text-lg text-primary">{spanValue} ppm</div>
                        </div>
                    </div>
                    <p className="text-xs text-center text-slate-500">Validation deviation: 0.1% (Pass)</p>
                </div>
            );
            case 4: return (
                <div className="text-center space-y-4 py-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-semibold">Calibration Complete</h4>
                        <p className="text-sm text-slate-500">Profile ready to save.</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[400px]">
            {/* Sidebar Steps */}
            <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-6">Calibration Wizard</h3>
                <div className="space-y-1 relative">
                    {/* Connector Line */}
                    <div className="absolute left-[11px] top-2 bottom-4 w-px bg-slate-200 md:block hidden"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex items-center gap-3 py-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${idx <= currentStep ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                {idx < currentStep ? <Check className="h-3 w-3" /> : idx + 1}
                            </div>
                            <span className={`text-sm ${idx === currentStep ? 'font-medium text-slate-900' : 'text-slate-500'}`}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                    {renderStepContent()}
                </div>

                <div className="mt-8 flex justify-between pt-4 border-t">
                    <button
                        className="btn text-slate-500"
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                    >
                        Back
                    </button>

                    <button
                        className="btn btn-primary gap-2"
                        onClick={handleNext}
                        disabled={isCalibrating || (currentStep === 1 && progress < 100) || (currentStep === 2 && progress < 100)}
                    >
                        {currentStep === steps.length - 1 ? (
                            <>
                                <Save className="h-4 w-4" /> Save Profile
                            </>
                        ) : (
                            <>
                                Next <ChevronRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
