'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  product_name: string;
  Quote_Quantity: number; // Ensure total_profit is a number
}

interface QuotePerProductComponentPieProps {
  data: DataItem[];
}


const QuotePerProductComponentPie: React.FC<QuotePerProductComponentPieProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = data.map(item => item.Quote_Quantity);
  const labels = data.map(item => item.product_name);

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
  const productssupplied = series.reduce((a, b) => a + b, 0);

  return (
    <div className={chartContainerStyle}>
      {isClient && (
        <ReactApexChart options={options} series={series} type="pie" height={350} width={"100%"}/>
      )}
      <div className="mt-4">
        <p className="font-bold text-white">Quote Quantity: {productssupplied}</p>
      </div>
    </div>
  );
};

export default QuotePerProductComponentPie;
