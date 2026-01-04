import { Vehicle } from './vehicle';
import { Driver } from './driver';

export interface Trip {
  id: number;
  trip_id: string;
  vehicle: Vehicle;
  driver: Driver;
  started_at: string;
  ended_at?: string;
  distance_km?: number;
  fuel_used_l?: number;
  eco_score?: number;
  status: 'planned' | 'in_progress' | 'completed';
}

export interface TripDataPoint {
  timestamp: string;
  speed_kmh: number;
  rpm: number;
  throttle_pct: number;
  acceleration_ms2: number;
  co2_ppm: number;
  nox_ppb: number;
  pm25_ug_m3: number;
  fuel_rate_lph: number;
  latitude: number;
  longitude: number;
  engine_temp_c: number;
  event_type?: 'acceleration' | 'braking' | 'cold_start' | 'idle' | 'normal';
}

export interface TripReport {
  trip: Trip;
  statistics: {
    distance_km: number;
    duration_minutes: number;
    fuel_consumed_l: number;
    avg_speed_kmh: number;
    max_speed_kmh: number;
    avg_eco_score: number;
  };
  emissions: {
    co2_total_g: number;
    co2_avg_ppm: number;
    nox_peak_ppb: number;
    nox_avg_ppb: number;
    pm25_exposure_ug_m3: number;
    pm25_avg_ug_m3: number;
    hc_total_g: number;
    co_total_g: number;
  };
  eco_score: {
    composite: number;
    baseline: number;
    improvement: number;
    breakdown: {
      acceleration: number;
      speed: number;
      idling: number;
      emissions: number;
    };
  };
  events: Array<{
    timestamp: string;
    type: 'acceleration' | 'braking' | 'cold_start' | 'harsh_turn' | 'speed_violation';
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  data_points: TripDataPoint[];
  maintenance_recommendations: Array<{
    type: 'engine' | 'emissions' | 'driving' | 'fuel';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    action: string;
  }>;
  historical_comparison: {
    avg_eco_score: number;
    avg_fuel_consumption: number;
    avg_emissions: {
      co2: number;
      nox: number;
      pm25: number;
    };
  };
}
