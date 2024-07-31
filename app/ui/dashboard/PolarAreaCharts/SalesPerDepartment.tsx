'use client'

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  department_name: string;
  total_sales: number; // Ensure total_profit is a number
}

interface SalesPerDepartmentPolarProps {
  data: DataItem[];
}

// Utility function to format currency
const currencyFormatter = (number: number) => {
  return '¥' + new Intl.NumberFormat('en-US').format(number).toString();
};

const SalesPerDepartmentPolar: React.FC<SalesPerDepartmentPolarProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total sum of total_profit values
  const totalSum = data.reduce((acc, item) => acc + item.total_sales, 0);

  // Calculate percentages and update series and labels
  const series = data.map(item => Math.round((item.total_sales / totalSum) * 100));
  const labels = data.map(item => item.department_name);

  const options: ApexOptions = {
    chart: {
      type: 'polarArea',
      height: 450,
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 1
    },
    labels,
    legend: {
      labels: {
        colors: '#fff', // Legend text color
      },
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden p-10 dark text-gray-950 bg-gray-900 border border-blue-700";

  // Summing the total profit
  const totalSales = data.reduce((a, b) => a + b.total_sales, 0);

  return (
    <div className={chartContainerStyle}>
      {isClient && (
        <ReactApexChart options={options} series={series} type="polarArea" height={350} width={"100%"}/>
      )}
      <div className="mt-4">
        <p className="font-bold text-white">Total Sales: {currencyFormatter(totalSales)}</p>
      </div>
    </div>
  );
};

export default SalesPerDepartmentPolar;
