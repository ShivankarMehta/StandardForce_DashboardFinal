'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  staff_name: string;
  total_profit: number; // Ensure total_profit is a number
}

interface CustomerSalesComponentPieProps {
  data: DataItem[];
}

// Utility function to format currency
const currencyFormatter = (number: number) => {
  return '¥' + new Intl.NumberFormat('en-US').format(number).toString();
};

const StaffSalesComponentPie: React.FC<CustomerSalesComponentPieProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = data.map(item => item.total_profit);
  const labels = data.map(item => item.staff_name);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
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
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden p-10 dark text-gray-950 bg-gray-900 border border-blue-700";

  // Summing the total profit
  const totalProfit = series.reduce((a, b) => a + b, 0);

  return (
    <div className={chartContainerStyle}>
      {isClient && (
        <ReactApexChart options={options} series={series} type="pie" height={350} width={"100%"}/>
      )}
      <div className="mt-4">
        <p className="font-bold text-white">Total Profit: {currencyFormatter(totalProfit)}</p>
      </div>
    </div>
  );
};

export default StaffSalesComponentPie;
