'use client';

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer } from "recharts";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DataPoint = {
  month: string;
  sales_2022: number;
  sales_2023: number;
  sales_2031: number;
  sales_2032: number;
};

type GroupedBarProps = {
  data: DataPoint[];
};

const chartConfig = {
  sales_2022: {
    label: "Sales 2022",
    color: "var(--chart-1)", 
  },
  sales_2023: {
    label: "Sales 2023",
    color: "var(--chart-2)", 
  },
  sales_2031: {
    label: "Sales 2031",
    color: "var(--chart-3)", 
  },
  sales_2032: {
    label: "Sales 2032",
    color: "var(--chart-4)", 
  },
};

export default function GroupedBarSales({ data }: GroupedBarProps) {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Transform month index (if month is numerical) to readable month names
    const transformData = (data: DataPoint[]) => {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      return data.map((row) => ({
        ...row,
        month: monthNames[parseInt(row.month) - 1] || row.month, // Handle months as numbers
      }));
    };

    if (data && data.length > 0) {
      setChartData(transformData(data));
    }
  }, [data]);

  return (
      <CardContent className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 60, bottom: 30 }}
        >
        <CartesianGrid vertical={false}/>
          <XAxis
            dataKey="month"
            tickLine={true}
            tick={{fontSize:12}}
            axisLine={true}
            tickMargin={5}
        />
        <YAxis 
          tick={{fontSize:12}}
          tickFormatter={(value) => `¥${value.toLocaleString()}`}
          tickLine={false}
          axisLine={false}
          />
         <Tooltip 
         formatter={(value: number, name: string) => [`¥${value.toLocaleString()}`, name]} />
        <Legend />
          {/* Add Bars for Each Sales Key */}
        <Bar
            dataKey="sales_2022"
            fill={chartConfig.sales_2022.color}
            name={chartConfig.sales_2022.label}
            radius={4}
        />
        <Bar
            dataKey="sales_2023"
            fill={chartConfig.sales_2023.color}
            name={chartConfig.sales_2023.label}
            radius={4}
        />
        <Bar
            dataKey="sales_2031"
            fill={chartConfig.sales_2031.color}
            name={chartConfig.sales_2031.label}
            radius={4}
        />
        <Bar
            dataKey="sales_2032"
            fill={chartConfig.sales_2032.color}
            name={chartConfig.sales_2032.label}
            radius={4}
        />
        </BarChart>
        </ResponsiveContainer>
      </CardContent>
  );
}
