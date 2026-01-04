import Webcam from 'react-webcam';
import { useCamera } from '@hooks/useCamera';
import { CheckCircle2, Circle } from 'lucide-react';

export const WebcamCapture = () => {
  const { webcamRef, captures, lightingOk, handleCapture, reset, getCameraConstraints, onUserMedia } =
    useCamera();

  return (
    <div className="grid gap-4">
      <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={getCameraConstraints()}
          ref={webcamRef}
          onUserMedia={onUserMedia}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1 shadow text-xs flex items-center gap-2">
          {lightingOk ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-success" /> Good lighting
            </>
          ) : (
            <>
              <Circle className="h-4 w-4 text-warning" /> Improve lighting
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm"
          onClick={handleCapture}
          aria-label="Capture face"
        >
          Capture Image
        </button>
        <button
          className="px-4 py-2 rounded-lg border text-sm"
          onClick={reset}
          aria-label="Reset capture"
        >
          Reset
        </button>
        <span className="text-xs text-neutral">{captures.length}/5 captured</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[0, 1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="h-20 rounded-lg border border-dashed border-slate-200 bg-white overflow-hidden"
          >
            {captures[idx] && <img src={captures[idx]} alt={`capture-${idx}`} className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
};

