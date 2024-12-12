'use client'

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  department_name: string;
  total_profit: number; // Ensure total_profit is a number
}

interface DepartmentSalesComponentBubbleProps {
  data: DataItem[];
}

// Utility function to format currency
const currencyFormatter = (number: number) => {
  return '¥' + new Intl.NumberFormat('en-US').format(number).toString();
};

const DepartmentSalesComponentBubble: React.FC<DepartmentSalesComponentBubbleProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate bubble chart series data
  const series = data.map((item, index) => ({
    name: item.department_name,
    data: [{
      x: index + 1, // Sequential index
      y: item.total_profit,
      z: item.total_profit // Scaled value for bubble size
    }]
  }));

  const options: ApexOptions = {
    chart: {
      height: 450,
      type: 'bubble',
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      tickAmount: data.length,
      type: 'category',
      labels: {
        rotate: 0,
      }
    },
    yaxis: {
      max: Math.max(...data.map(item => item.total_profit)) * 1.2 // Scale y-axis
    },
    legend: {
      labels: {
        colors: '#fff', // Legend text color
      },
      position: 'bottom',
    },
    theme: {
        palette: 'palette7'
      }
  };

  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden p-10 dark text-gray-950 bg-gray-900 border border-blue-700";

  // Summing the total profit
  const totalProfit = data.reduce((a, b) => a + b.total_profit, 0);

  return (
    <div className={chartContainerStyle}>
      {isClient && (
        <ReactApexChart options={options} series={series} type="bubble" height={450} width={"100%"}/>
      )}
      <div className="mt-4">
        <p className="font-bold text-white">Total Profit: {currencyFormatter(totalProfit)}</p>
      </div>
    </div>
  );
};

export default DepartmentSalesComponentBubble;
