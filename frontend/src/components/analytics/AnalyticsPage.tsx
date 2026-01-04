import { useState } from 'react';
import { Calendar, TrendingUp, Award, Target, FileText } from 'lucide-react';
import { TripHistoryList } from './TripHistoryList';
import { TrendCharts } from './TrendCharts';
import { TripComparison } from './TripComparison';
import { PersonalBestWorst } from './PersonalBestWorst';
import { FleetComparison } from './FleetComparison';
import { ProgressTracking } from './ProgressTracking';
import { ReportsPage } from './ReportsPage';
import type { Trip } from '@/types';

// Mock historical trips data
const mockTrips: Trip[] = [
  {
    id: 1,
    trip_id: 'T-2025-12-20-001',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-20T08:30:00Z',
    ended_at: '2025-12-20T09:45:00Z',
    distance_km: 45.2,
    fuel_used_l: 3.8,
    eco_score: 82,
    status: 'completed'
  },
  {
    id: 2,
    trip_id: 'T-2025-12-19-002',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-19T14:20:00Z',
    ended_at: '2025-12-19T15:35:00Z',
    distance_km: 38.5,
    fuel_used_l: 3.2,
    eco_score: 88,
    status: 'completed'
  },
  {
    id: 3,
    trip_id: 'T-2025-12-18-003',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-18T09:15:00Z',
    ended_at: '2025-12-18T10:50:00Z',
    distance_km: 52.1,
    fuel_used_l: 4.5,
    eco_score: 75,
    status: 'completed'
  },
  {
    id: 4,
    trip_id: 'T-2025-12-17-004',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-17T16:00:00Z',
    ended_at: '2025-12-17T17:10:00Z',
    distance_km: 42.3,
    fuel_used_l: 3.6,
    eco_score: 79,
    status: 'completed'
  },
  {
    id: 5,
    trip_id: 'T-2025-12-16-005',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-16T07:45:00Z',
    ended_at: '2025-12-16T09:00:00Z',
    distance_km: 48.7,
    fuel_used_l: 4.1,
    eco_score: 85,
    status: 'completed'
  },
  {
    id: 6,
    trip_id: 'T-2025-12-15-006',
    vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
    driver: { id: 1, user_id: 1, vehicle_id: 1, license_number: 'DL-12345', status: 'authorized', face_registered: true },
    started_at: '2025-12-15T11:30:00Z',
    ended_at: '2025-12-15T12:55:00Z',
    distance_km: 55.8,
    fuel_used_l: 5.2,
    eco_score: 68,
    status: 'completed'
  }
];

export const AnalyticsPage = () => {
  const [selectedTrips, setSelectedTrips] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year' | 'all'>('month');
  const [tab, setTab] = useState<'overview' | 'reports'>('overview');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${tab === 'overview' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
          onClick={() => setTab('overview')}
        >
          <TrendingUp className="h-4 w-4" /> Analytics Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${tab === 'reports' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
          onClick={() => setTab('reports')}
        >
          <FileText className="h-4 w-4" /> Reports Generator
        </button>
      </div>

      {tab === 'reports' ? (
        <ReportsPage />
      ) : (
        <div className="grid gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Historical Data & Analytics</h1>
              <p className="text-sm text-neutral mt-1">
                Track your progress and analyze driving patterns over time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
                className="input h-10 w-40"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon={<Calendar className="h-5 w-5" />}
              label="Total Trips"
              value={mockTrips.length.toString()}
              subtitle={`${dateRange} period`}
            />
            <SummaryCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Avg Eco-Score"
              value={Math.round(mockTrips.reduce((sum, t) => sum + (t.eco_score || 0), 0) / mockTrips.length).toString()}
              subtitle="Improving"
              trend="up"
            />
            <SummaryCard
              icon={<Award className="h-5 w-5" />}
              label="Best Score"
              value={Math.max(...mockTrips.map(t => t.eco_score || 0)).toString()}
              subtitle="Personal best"
            />
            <SummaryCard
              icon={<Target className="h-5 w-5" />}
              label="Total Distance"
              value={`${mockTrips.reduce((sum, t) => sum + (t.distance_km || 0), 0).toFixed(0)} km`}
              subtitle={`${dateRange} period`}
            />
          </div>

          {/* Trip History List */}
          <TripHistoryList
            trips={mockTrips}
            selectedTrips={selectedTrips}
            onSelectionChange={setSelectedTrips}
          />

          {/* Trend Charts */}
          <TrendCharts trips={mockTrips} dateRange={dateRange} />

          {/* Trip Comparison */}
          {selectedTrips.length >= 2 && (
            <TripComparison
              trips={mockTrips.filter(t => selectedTrips.includes(t.id))}
            />
          )}

          {/* Personal Best/Worst */}
          <PersonalBestWorst trips={mockTrips} />

          {/* Fleet Comparison (if applicable) */}
          <FleetComparison trips={mockTrips} />

          {/* Progress Tracking */}
          <ProgressTracking trips={mockTrips} />
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ icon, label, value, subtitle, trend }: {
  icon: JSX.Element;
  label: string;
  value: string;
  subtitle: string;
  trend?: 'up' | 'down';
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <div className="text-primary">{icon}</div>
      {trend && (
        <span className={`text-xs ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-neutral">{label}</div>
    <div className="text-xs text-neutral mt-1">{subtitle}</div>
  </div>
);
