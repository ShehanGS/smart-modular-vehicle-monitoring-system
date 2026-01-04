import { useState } from 'react';
import { FaceCapture } from './FaceCapture';
import type { Driver } from '@/types';
import { notifySuccess } from '@services/notifications';

export const DriverRegistration = () => {
  const [form, setForm] = useState<Partial<Driver>>({
    full_name: '',
    license_number: '',
    vehicle_id: 1,
    status: 'pending',
    face_registered: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifySuccess('Driver submitted for approval');
    setForm({
      full_name: '',
      license_number: '',
      vehicle_id: 1,
      status: 'pending',
      face_registered: false
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral">Admin only</p>
          <h3 className="font-semibold">Register New Driver</h3>
        </div>
        <span className="text-xs text-primary">Multi-angle capture required</span>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm grid gap-1">
            Full Name
            <input
              required
              className="rounded-lg border px-3 py-2"
              value={form.full_name}
              onChange={(e) => setForm((f: Partial<Driver>) => ({ ...f, full_name: e.target.value }))}
            />
          </label>
          <label className="text-sm grid gap-1">
            License Number
            <input
              required
              className="rounded-lg border px-3 py-2"
              value={form.license_number}
              onChange={(e) => setForm((f: Partial<Driver>) => ({ ...f, license_number: e.target.value }))}
            />
          </label>
          <label className="text-sm grid gap-1">
            Vehicle
            <select
              className="rounded-lg border px-3 py-2"
              value={form.vehicle_id}
              onChange={(e) => setForm((f: Partial<Driver>) => ({ ...f, vehicle_id: Number(e.target.value) }))}
            >
              <option value={1}>Toyota Corolla</option>
              <option value={2}>Honda Civic</option>
            </select>
          </label>
          <label className="text-sm grid gap-1">
            Authorization Level
            <select
              className="rounded-lg border px-3 py-2"
              value={form.status}
              onChange={(e) => setForm((f: Partial<Driver>) => ({ ...f, status: e.target.value as Driver['status'] }))}
            >
              <option value="authorized">Authorized</option>
              <option value="pending">Pending</option>
              <option value="unauthorized">Unauthorized</option>
            </select>
          </label>
        </div>
        <FaceCapture />
        <div className="flex items-center gap-2">
          <button type="submit" className="rounded-lg bg-primary text-white px-4 py-2 font-semibold">
            Register
          </button>
          <button type="button" className="rounded-lg border px-4 py-2 text-sm">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

