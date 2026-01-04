export interface Vehicle {
  id: number;
  vehicle_id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  engine_specs?: string;
  obd_protocol?: string;
  status?: 'online' | 'offline' | 'maintenance';
}

