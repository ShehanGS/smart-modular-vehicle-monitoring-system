import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const RealTimeChart = ({
  data,
  dataKeys
}: {
  data: Array<Record<string, number | string>>;
  dataKeys: string[];
}) => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data}>
      <XAxis dataKey="timestamp" hide />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, idx) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][idx % 4]}
          strokeWidth={2}
          dot={false}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

