import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface MonthlyTotal {
  name: string;
  total: number;
}

interface OverviewProps {
  setMonthlyTotal: Dispatch<SetStateAction<number>>;
}

export const Overview: React.FC<OverviewProps> = ({ setMonthlyTotal }) => {
  const [data, setData] = useState<MonthlyTotal[]>([]);

  useEffect(() => {
    const fetchMonthlyTotal = async () => {
      try {
        const res = await axios.get<MonthlyTotal[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/monthlyTotals`);
        setData(res.data);
        const total = res.data.reduce((acc, item) => acc + item.total, 0);
        setMonthlyTotal(total);
      } catch (error) {
        console.error("Failed to fetch monthly totals:", error);
      }
    };
    fetchMonthlyTotal();
  }, [setMonthlyTotal]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
