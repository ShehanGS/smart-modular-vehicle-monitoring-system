import { Vehicle } from './vehicle';

export interface UnauthorizedDriverEvent {
  id: number;
  event_id: string;
  vehicle: Vehicle;
  detected_at: string;
  captured_image_path: string;
  match_score: number;
  location_lat: number;
  location_lon: number;
  admin_notified: boolean;
}

export interface Alert {
  id: number;
  alert_type?: string;
  type?: string; // safety, emission, maintenance, etc.
  severity: 'low' | 'medium' | 'high' | 'critical' | 'warning' | 'info';
  status: 'new' | 'acknowledged' | 'resolved' | 'active' | 'history';
  title: string;
  message: string;
  created_at: string;
  unauthorized_event?: UnauthorizedDriverEvent;
}

