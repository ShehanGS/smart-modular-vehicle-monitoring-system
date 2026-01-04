import { useState, useEffect } from 'react';
import { Play, Pause, Rewind, FastForward } from 'lucide-react';

interface TripReplayProps {
    durationSeconds: number;
    onTimeUpdate: (time: number) => void;
}

export const TripReplay = ({ durationSeconds, onTimeUpdate }: TripReplayProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= durationSeconds) {
                        setIsPlaying(false);
                        return prev;
                    }
                    const next = prev + speed;
                    onTimeUpdate(next); // Sync parent
                    return next;
                });
            }, 1000 / speed); // Rough emulation
        }
        return () => clearInterval(interval);
    }, [isPlaying, speed, durationSeconds, onTimeUpdate]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setCurrentTime(val);
        onTimeUpdate(val);
    };

    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Trip Replay</h3>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                    {new Date(currentTime * 1000).toISOString().substr(11, 8)} / {new Date(durationSeconds * 1000).toISOString().substr(11, 8)}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="p-2 rounded-full hover:bg-slate-100"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause className="h-5 w-5 text-primary" /> : <Play className="h-5 w-5 text-primary" />}
                </button>

                <input
                    type="range"
                    min="0"
                    max={durationSeconds}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex bg-slate-100 rounded-lg p-1">
                    {[1, 5, 10].map(s => (
                        <button
                            key={s}
                            onClick={() => setSpeed(s)}
                            className={`px-2 py-1 text-xs font-medium rounded ${speed === s ? 'bg-white shadow' : 'text-slate-500'}`}
                        >
                            {s}x
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
