import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@components/common/Navbar';
import { Sidebar } from '@components/common/Sidebar';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { Login } from '@components/auth/Login';
import { Register } from '@components/auth/Register';
import { ProtectedRoute } from '@components/auth/ProtectedRoute';
import { AdminDashboard } from '@components/dashboard/AdminDashboard';
import { DriverDashboard } from '@components/dashboard/DriverDashboard';
import { VehicleList } from '@components/vehicles/VehicleList';
import { DriverList } from '@components/drivers/DriverList';
import { DriverRegistration } from '@components/drivers/DriverRegistration';
import { TripDetail } from '@components/trips/TripDetail';
import { SensorDashboard } from '@components/sensors/SensorDashboard';
import { AlertCenter } from '@components/alerts/AlertCenter';
import { UnauthorizedDriverAlert } from '@components/alerts/UnauthorizedDriverAlert';
import { EmissionReport } from '@components/emissions/EmissionReport';
import { AnomalyTimeline } from '@components/emissions/AnomalyTimeline';
import { ImpactVisualization } from '@components/emissions/ImpactVisualization';
import { AnalyticsPage } from '@components/analytics/AnalyticsPage';
import { SettingsPage } from '@components/common/SettingsPage';
import { authStore } from '@stores/authStore';

const unauthorizedSample = {
  id: 1,
  event_id: 'EV-1',
  vehicle: { id: 1, vehicle_id: 'V-001', make: 'Toyota', model: 'Corolla', year: 2021, license_plate: 'ABC-1234' },
  detected_at: new Date().toISOString(),
  captured_image_path: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=60',
  match_score: 12,
  location_lat: 7.2083,
  location_lon: 79.8358,
  admin_notified: true
};

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = authStore();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function OverviewPage() {
  const { user } = authStore();
  if (user?.role === 'driver') {
    return <DriverDashboard />;
  }
  return <AdminDashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Layout>
            <OverviewPage />
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <Layout>
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/driver"
        element={
          <Layout>
            <ProtectedRoute roles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <Layout>
            <VehicleList />
          </Layout>
        }
      />
      <Route
        path="/drivers"
        element={
          <Layout>
            <DriverRegistration />
            <DriverList />
          </Layout>
        }
      />
      <Route
        path="/trips"
        element={
          <Layout>
            <TripDetail />
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <ProtectedRoute roles={['admin', 'driver', 'viewer']}>
              <AnalyticsPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/sensors"
        element={
          <Layout>
            <SensorDashboard />
          </Layout>
        }
      />
      <Route
        path="/alerts"
        element={
          <Layout>
            <AlertCenter />
            <div className="mt-4">
              <UnauthorizedDriverAlert event={unauthorizedSample} />
            </div>
          </Layout>
        }
      />
      <Route
        path="/emissions"
        element={
          <Layout>
            <div className="grid gap-4">
              <EmissionReport />
              <AnomalyTimeline />
              <ImpactVisualization />
            </div>
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <SettingsPage />
          </Layout>
        }
      />
    </Routes>
  );
}

