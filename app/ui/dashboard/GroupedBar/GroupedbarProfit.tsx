// 'use client'
// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// type DataPoint = {
//   month: string;
//   sales_2022: number;
//   sales_2023: number;
//   sales_2031: number;
//   sales_2032: number;
// };

// type GroupedBarProps = {
//   data: DataPoint[];
// };

// type ChartData = {
//   series: { name: string; data: number[] }[];
//   categories: string[];
// };

// const GroupedBar: React.FC<GroupedBarProps> = ({ data }) => {
//   const [chartData, setChartData] = useState<ChartData>({ series: [], categories: [] });

//   useEffect(() => {
//     const transformData = (data: DataPoint[]) => {
//         const monthNames = [
//             'Jan', 'Feb', 'March', 'Apr', 'May', 'June', 
//             'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
//           ];
    
//         const categories = data.map(row => {
//             const monthIndex = parseInt(row.month) - 1; // Convert month to 0-indexed
//             return monthNames[monthIndex];
//           });
//       const seriesData = {
//         sales_2022: data.map(row => row.sales_2022),
//         sales_2023: data.map(row => row.sales_2023),
//         sales_2031: data.map(row => row.sales_2031),
//         sales_2032: data.map(row => row.sales_2032),
//       };

//       const series = Object.keys(seriesData).map(key => ({
//         name: key,
//         data: seriesData[key as keyof typeof seriesData],
//       }));

//       setChartData({ series, categories });
//     };

//     if (data && data.length > 0) {
//       transformData(data);
//     }
//   }, [data]);

//   const options = {
//     chart: {
//       type: 'bar',
//       height: 430,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         dataLabels: {
//           position: 'top',
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       offsetX: -6,
//       style: {
//         fontSize: '12px',
//         colors: ['#000'], // Change text color to black
//       },
//     },
//     stroke: {
//       show: true,
//       width: 1,
//       colors: ['#fff'],
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//     xaxis: {
//       categories: chartData.categories,
//     },
//   };

//   const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden bg-white p-10 text-gray-950";

//   return (
//     <div>
//       <div className={chartContainerStyle} id="chart">
//         <ReactApexChart options={options} series={chartData.series} type="bar" height={430} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default GroupedBar;

'use client'
import React, { useEffect, useState } from 'react';
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
  profit_2022: number;
  profit_2023: number;
  profit_2031: number;
  profit_2032: number;
};

type GroupedBarProps = {
  data: DataPoint[];
};

const chartConfig = {
  profit_2022: {
    label: "Profit 2022",
    color: "var(--chart-1)", 
  },
  profit_2023: {
    label: "Profit 2023",
    color: "var(--chart-2)", 
  },
  profit_2031: {
    label: "Profit 2031",
    color: "var(--chart-3)", 
  },
  profit_2032: {
    label: "Profit 2032",
    color: "var(--chart-4)", 
  },
};

const GroupedBarProfit: React.FC<GroupedBarProps> = ({ data }) => {
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
    <CardContent className='w-full h-96'>
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
        <Bar
            dataKey="profit_2022"
            fill={chartConfig.profit_2022.color}
            name={chartConfig.profit_2022.label}
            radius={4}
        />
        <Bar
            dataKey="profit_2023"
            fill={chartConfig.profit_2023.color}
            name={chartConfig.profit_2023.label}
            radius={4}
        />
        <Bar
            dataKey="profit_2031"
            fill={chartConfig.profit_2031.color}
            name={chartConfig.profit_2031.label}
            radius={4}
        />
        <Bar
            dataKey="profit_2032"
            fill={chartConfig.profit_2032.color}
            name={chartConfig.profit_2032.label}
            radius={4}
        />
       </BarChart>
      </ResponsiveContainer>
    </CardContent>
  );
};

export default GroupedBarProfit;
