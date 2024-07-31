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

'use client';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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

type ChartData = {
  series: { name: string; data: number[] }[];
  categories: string[];
};

const GroupedBarSales: React.FC<GroupedBarProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData>({ series: [], categories: [] });

  useEffect(() => {
    const transformData = (data: DataPoint[]) => {
      const monthNames = [
        'Jan', 'Feb', 'March', 'Apr', 'May', 'June', 
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];

      const categories = data.map(row => {
        const monthIndex = parseInt(row.month) - 1; // Convert month to 0-indexed
        return monthNames[monthIndex];
      });

      const seriesData = {
        sales_2022: data.map(row => row.sales_2022),
        sales_2023: data.map(row => row.sales_2023),
        sales_2031: data.map(row => row.sales_2031),
        sales_2032: data.map(row => row.sales_2032),
      };

      const series = Object.keys(seriesData).map(key => ({
        name: key,
        data: seriesData[key as keyof typeof seriesData],
      }));

      setChartData({ series, categories });
    };

    if (data && data.length > 0) {
      transformData(data);
    }
  }, [data]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 700,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: 'Monthly Sales Data',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
    },
    stroke: {
      show: true,
      width: 2,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#fff'
        }
      },
      title: {
        text: 'Month',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#fff'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      },
      title: {
        text: 'Sales',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#fff'
        }
      }
    },
    legend: {
      labels: {
        colors: '#fff',
      },
      position: 'top',
      horizontalAlign: 'center'
    }
  };

  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden p-10 dark text-gray-950 bg-gray-900 border border-blue-700"; // Use white background and gray text for better contrast

  return (
    <div>
      <div className={chartContainerStyle} id="chart">
        <ReactApexChart options={options} series={chartData.series} type="bar" height={430} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default GroupedBarSales;
