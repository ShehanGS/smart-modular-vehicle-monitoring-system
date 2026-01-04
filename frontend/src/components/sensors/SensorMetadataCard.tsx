import type { FC } from 'react';
import { Calendar, Ruler, Activity } from 'lucide-react';
import { formatDateTime } from '@utils/helpers';

interface SensorMetadataProps {
    sensorType: string;
    lastCalibrated: string;
    offset: number;
    slope: number;
    status: 'ok' | 'drift' | 'error';
}

export const SensorMetadataCard: FC<SensorMetadataProps> = ({
    sensorType,
    lastCalibrated,
    offset,
    slope,
    status
}) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{sensorType} Sensor</h4>
                <div className={`px-2 py-1 rounded text-xs font-medium uppercase ${status === 'ok' ? 'bg-success/10 text-success' :
                    status === 'drift' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                    }`}>
                    {status === 'drift' ? 'Drift Warning' : status}
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral">
                    <Calendar className="h-4 w-4" />
                    <span>Last Cal: {formatDateTime(lastCalibrated)}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral">
                    <Ruler className="h-4 w-4" />
                    <span>Offset: {offset.toFixed(3)} | Slope: {slope.toFixed(3)}</span>
                </div>

                {status === 'drift' && (
                    <div className="mt-3 p-2 bg-warning/5 border border-warning/20 rounded text-xs text-warning-700 flex items-start gap-2">
                        <Activity className="h-4 w-4 shrink-0" />
                        <p>Drift detected {'>'} 5%. Recalibration recommended.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
