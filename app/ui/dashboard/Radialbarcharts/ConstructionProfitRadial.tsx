// 'use client'
// import dynamic from 'next/dynamic';
// import React, { useEffect, useState } from 'react';
// import { ApexOptions } from 'apexcharts';

// interface DataItem {
//   construction_name: string;
//   total_profit: number; // Ensure total_profit is a number
// }

// interface ConstructionSalesComponentRadialProps {
//   data: DataItem[];
// }

// const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const ConstructionSalesComponentRadial: React.FC<ConstructionSalesComponentRadialProps> = ({ data }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [series, setSeries] = useState<number[]>([]);
//   const [labels, setLabels] = useState<string[]>([]);

//   useEffect(() => {
//     setIsClient(true);

//     // Calculate total sum of total_profit values
//     const totalSum = data.reduce((acc, item) => acc + item.total_profit, 0);

//     // Calculate percentages and update series and labels
//     const updatedSeries = data.map(item => Math.round((item.total_profit / totalSum) * 100));
//     const updatedLabels = data.map(item => item.construction_name);

//     setSeries(updatedSeries);
//     setLabels(updatedLabels);
//   }, [data]);

//   const options: ApexOptions = {
//     series,
//     chart: {
//       height: 350,
//       type: 'radialBar',
//       toolbar: {
//         show: true,
//       },
//     },
//     plotOptions: {
//       radialBar: {
//         offsetY: 0,
//         startAngle: 0,
//         endAngle: 360,
//         hollow: {
//           margin: 5,
//           size: '10%',
//           background: 'transparent',
//           image: undefined,
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             show: true,
//           }
//         }
//       }
//     },
//     labels,
//     legend: {
//       show: true,
//       floating: true,
//       fontSize: '15px',
//       position: 'left',
//       offsetX: -30,
//       offsetY: 0,
//       labels: {
//         useSeriesColors: true,
//       },
//       formatter: function(seriesName: string, opts: any) {
//         const seriesValue = opts.w.globals.series[opts.seriesIndex];
//         if (typeof seriesValue !== 'undefined') {
//           return `${seriesName}: ${seriesValue.toString()}%`;
//         }
//         return '';
//       },
//       itemMargin: {
//         vertical: 3
//       }
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//         }
//       }
//     }]
//   };

//   const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden bg-white p-4";

//   return (
//     <div className={chartContainerStyle}>
//       {isClient && typeof window !== 'undefined' && (
//         <ReactApexChart options={options} series={series} type="radialBar" height={350} />
//       )}
//     </div>
//   );
// };

// export default ConstructionSalesComponentRadial;

'use client'

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  construction_name: string;
  total_profit: number; // Ensure total_profit is a number
}

interface ConstructionSalesComponentRadialProps {
  data: DataItem[];
}

// Utility function to format currency
const currencyFormatter = (number: number) => {
  return '$' + new Intl.NumberFormat('en-US').format(number).toString();
};

const ConstructionSalesComponentRadial: React.FC<ConstructionSalesComponentRadialProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total sum of total_profit values
  const totalSum = data.reduce((acc, item) => acc + item.total_profit, 0);

  // Calculate percentages and update series and labels
  const series = data.map(item => Math.round((item.total_profit / totalSum) * 100));
  const labels = data.map(item => item.construction_name);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 5,
          size: '10%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function() {
              return totalSum.toString();
            }
          }
        }
      }
    },
    labels,
    legend: {
      show: true,
      floating: true,
      fontSize: '15px',
      position: 'left',
      offsetX: -30,
      offsetY: 0,
      labels: {
        useSeriesColors: true,
      },
      formatter: function(seriesName: string, opts: any) {
        const seriesValue = opts.w.globals.series[opts.seriesIndex];
        if (seriesValue !== undefined) {
          return `${seriesName}: ${seriesValue.toString()}%`;
        }
        return '';
      },
      itemMargin: {
        vertical: 3
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        }
      }
    }]
  };

  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden bg-white p-4";

  return (
    <div className={chartContainerStyle}>
      {isClient && typeof window !== 'undefined' && (
        <ReactApexChart options={options} series={series} type="radialBar" height={350} />
      )}
    </div>
  );
};

export default ConstructionSalesComponentRadial;
