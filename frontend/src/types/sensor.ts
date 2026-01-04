export interface LiveSensorData {
  timestamp: string;
  speed_kmh: number;
  rpm: number;
  throttle_pct: number;
  co2_ppm: number;
  nox_ppb: number;
  pm25_ug_m3: number;
  eco_score: number;
  fuel_rate_lph: number;
}

export interface SensorStatus {
  connected: boolean;
  last_update: string;
  calibration_status: 'ok' | 'needs_calibration';
  warning?: string;
}

