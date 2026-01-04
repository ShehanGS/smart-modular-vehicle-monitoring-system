import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const EmissionChart = ({ data }: { data: Array<Record<string, number | string>> }) => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="co2" stroke="#3B82F6" strokeWidth={2} dot={false} />
      <Line type="monotone" dataKey="nox" stroke="#F59E0B" strokeWidth={2} dot={false} />
      <Line type="monotone" dataKey="pm25" stroke="#EF4444" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

