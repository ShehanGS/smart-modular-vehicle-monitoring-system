export const getCameraConstraints = (): MediaTrackConstraints => ({
  width: 640,
  height: 480,
  facingMode: 'user'
});

export const validateLighting = (averageBrightness: number) => averageBrightness > 80;

