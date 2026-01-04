import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { getCameraConstraints, validateLighting } from '@services/camera';

export const useCamera = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [captures, setCaptures] = useState<string[]>([]);
  const [lightingOk, setLightingOk] = useState(true);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCaptures((prev) => [...prev, imageSrc].slice(0, 5));
    }
  }, []);

  const reset = () => setCaptures([]);

  const onUserMedia = useCallback((stream: MediaStream) => {
    const track = stream.getVideoTracks()[0];
    if (!track) return;
    
    try {
      const imageCapture = new (window as any).ImageCapture(track);
      if (imageCapture && typeof imageCapture.grabFrame === 'function') {
        imageCapture.grabFrame().then((bitmap: ImageBitmap) => {
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(bitmap, 0, 0);
          const data = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
          const avg = data.reduce((sum, value, idx) => sum + (idx % 4 === 3 ? 0 : value), 0) / (data.length / 4);
          setLightingOk(validateLighting(avg));
        }).catch(() => {
          // ImageCapture API not supported, skip lighting validation
          setLightingOk(true);
        });
      }
    } catch {
      // ImageCapture not available, skip lighting validation
      setLightingOk(true);
    }
  }, []);

  return { webcamRef, captures, lightingOk, handleCapture, reset, getCameraConstraints, onUserMedia };
};

