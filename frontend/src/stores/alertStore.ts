import { create } from 'zustand';
import type { Alert } from '@/types';

interface AlertState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateStatus: (id: number, status: Alert['status']) => void;
  clearHistory: () => void;
}

// Mock initial data
const generateMockAlerts = (): Alert[] => [
  {
    id: 1,
    title: 'High CO Levels Detected',
    message: 'Carbon Monoxide levels exceeding safe threshold (50ppm). Immediate ventilation required.',
    severity: 'critical',
    status: 'active',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: 'safety'
  },
  {
    id: 2,
    title: 'NOx Limit Exceeded',
    message: 'NOx emissions detected at 0.12 g/km. Check EGR valve.',
    severity: 'warning',
    status: 'active',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'emission'
  },
  {
    id: 3,
    title: 'O2 Sensor Voltage',
    message: 'Sensor Bank 1 Sensor 2 voltage low (0.1V). Possible lean condition.',
    severity: 'info',
    status: 'acknowledged',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'sensor'
  },
  {
    id: 4,
    title: 'Misfire Cylinder 3',
    message: 'P0303 Detected. Catalyst damage risk.',
    severity: 'critical',
    status: 'history',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: 'maintenance'
  }
];

export const alertStore = create<AlertState>((set) => ({
  alerts: generateMockAlerts(),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 50) })),
  updateStatus: (id, status) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, status } : a))
    })),
  clearHistory: () => set((state) => ({ alerts: state.alerts.filter(a => a.status !== 'history') }))
}));

