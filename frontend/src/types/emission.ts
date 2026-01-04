export interface EmissionReport {
  trip_id: string;
  co2_total_g: number;
  nox_intensity_mg_km: number;
  pm25_exposure: number;
  baseline_comparison?: number;
}

export interface AnomalyEvent {
  id: string;
  type: 'rich_combustion' | 'nox_spike' | 'pm_spike' | 'other';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

