export interface Driver {
  id: number;
  user_id: number;
  vehicle_id: number;
  license_number: string;
  status: 'authorized' | 'unauthorized' | 'pending' | 'suspended';
  face_registered: boolean;
  full_name?: string;
  eco_score?: number;
}

