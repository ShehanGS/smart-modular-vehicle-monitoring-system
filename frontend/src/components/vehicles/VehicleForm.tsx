import { useState } from 'react';
import type { Vehicle } from '@/types';

export const VehicleForm = ({ onSave }: { onSave: (vehicle: Vehicle) => void }) => {
  const [form, setForm] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    license_plate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      vehicle_id: `V-${Date.now()}`,
      make: form.make ?? '',
      model: form.model ?? '',
      year: Number(form.year) || new Date().getFullYear(),
      license_plate: form.license_plate ?? '',
      status: 'online'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm grid gap-1">
          Make
          <input
            required
            className="rounded-lg border px-3 py-2"
            value={form.make}
            onChange={(e) => setForm((f: Partial<Vehicle>) => ({ ...f, make: e.target.value }))}
          />
        </label>
        <label className="text-sm grid gap-1">
          Model
          <input
            required
            className="rounded-lg border px-3 py-2"
            value={form.model}
            onChange={(e) => setForm((f: Partial<Vehicle>) => ({ ...f, model: e.target.value }))}
          />
        </label>
        <label className="text-sm grid gap-1">
          Year
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            value={form.year}
            onChange={(e) => setForm((f: Partial<Vehicle>) => ({ ...f, year: Number(e.target.value) }))}
          />
        </label>
        <label className="text-sm grid gap-1">
          License Plate
          <input
            required
            className="rounded-lg border px-3 py-2"
            value={form.license_plate}
            onChange={(e) => setForm((f: Partial<Vehicle>) => ({ ...f, license_plate: e.target.value }))}
          />
        </label>
      </div>
      <label className="text-sm grid gap-1">
        Engine Specs
        <input
          className="rounded-lg border px-3 py-2"
          value={form.engine_specs}
          onChange={(e) => setForm((f: Partial<Vehicle>) => ({ ...f, engine_specs: e.target.value }))}
        />
      </label>
      <button type="submit" className="rounded-lg bg-primary text-white py-2 font-semibold">
        Save Vehicle
      </button>
    </form>
  );
};

