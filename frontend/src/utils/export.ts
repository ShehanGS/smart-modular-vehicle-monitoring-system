import type { TripReport } from '@/types';

export const exportToCSV = (tripReport: TripReport) => {
  // Create CSV content
  const headers = [
    'Timestamp',
    'Speed (km/h)',
    'RPM',
    'Throttle (%)',
    'Acceleration (m/s²)',
    'CO₂ (ppm)',
    'NOx (ppb)',
    'PM2.5 (μg/m³)',
    'Fuel Rate (L/h)',
    'Latitude',
    'Longitude',
    'Engine Temp (°C)',
    'Event Type'
  ];

  const rows = tripReport.data_points.map(point => [
    point.timestamp,
    point.speed_kmh.toFixed(2),
    point.rpm.toFixed(0),
    point.throttle_pct.toFixed(1),
    point.acceleration_ms2.toFixed(2),
    point.co2_ppm.toFixed(1),
    point.nox_ppb.toFixed(1),
    point.pm25_ug_m3.toFixed(2),
    point.fuel_rate_lph.toFixed(2),
    point.latitude.toFixed(6),
    point.longitude.toFixed(6),
    point.engine_temp_c.toFixed(1),
    point.event_type || 'normal'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `trip-report-${tripReport.trip.trip_id}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (tripReport: TripReport) => {
  // For now, create a simple HTML representation that can be printed
  // In production, use a library like jsPDF or pdfmake
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Trip Report - ${tripReport.trip.trip_id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #3B82F6; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Trip Report: ${tripReport.trip.trip_id}</h1>
        <h2>Statistics</h2>
        <table>
          <tr><th>Distance</th><td>${tripReport.statistics.distance_km.toFixed(1)} km</td></tr>
          <tr><th>Duration</th><td>${tripReport.statistics.duration_minutes} minutes</td></tr>
          <tr><th>Fuel Consumed</th><td>${tripReport.statistics.fuel_consumed_l.toFixed(2)} L</td></tr>
          <tr><th>Average Speed</th><td>${tripReport.statistics.avg_speed_kmh.toFixed(1)} km/h</td></tr>
          <tr><th>Eco-Score</th><td>${tripReport.eco_score.composite}</td></tr>
        </table>
        <h2>Emissions</h2>
        <table>
          <tr><th>CO₂ Total</th><td>${(tripReport.emissions.co2_total_g / 1000).toFixed(2)} kg</td></tr>
          <tr><th>NOx Peak</th><td>${tripReport.emissions.nox_peak_ppb.toFixed(0)} ppb</td></tr>
          <tr><th>PM2.5 Exposure</th><td>${tripReport.emissions.pm25_exposure_ug_m3.toFixed(1)} μg/m³</td></tr>
        </table>
        <h2>Events</h2>
        <table>
          <tr><th>Time</th><th>Type</th><th>Description</th></tr>
          ${tripReport.events.map(e => `
            <tr>
              <td>${new Date(e.timestamp).toLocaleString()}</td>
              <td>${e.type}</td>
              <td>${e.description}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  } else {
    // Fallback: show alert
    alert('Please allow popups to export PDF. For now, use the browser print function (Ctrl+P) after viewing this report.');
  }
};

