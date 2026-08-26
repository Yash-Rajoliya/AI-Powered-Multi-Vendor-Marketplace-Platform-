import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 7000 },
  { name: "Mar", revenue: 5000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      
      <h3 className="font-semibold mb-4">Revenue</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;