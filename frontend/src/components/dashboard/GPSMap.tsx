import { MapPin, Navigation } from 'lucide-react';

interface GPSMapProps {
  location: { lat: number; lon: number };
}

export const GPSMap = ({ location }: GPSMapProps) => {
  // For now, using a placeholder. In production, integrate with Mapbox, Leaflet, or Google Maps
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lon - 0.01},${location.lat - 0.01},${location.lon + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lon}`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Current Location</h3>
      </div>
      <div className="relative h-64 rounded-lg overflow-hidden border border-slate-200">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="pointer-events-none"
          title="GPS Location Map"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs">
          <div className="flex items-center gap-1">
            <Navigation className="h-3 w-3 text-primary" />
            <span className="font-mono">
              {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-neutral text-center">
        Live GPS tracking active
      </div>
    </div>
  );
};

