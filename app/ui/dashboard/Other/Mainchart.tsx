'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define a custom type for the series
interface MixedChartSeries {
  name: string;
  type: 'line' | 'bar'; // Define the type as either 'line' or 'bar'
  data: number[];
}

export default function MainChartComponent(props) {
    const [series, setSeries] = useState<MixedChartSeries[]>([]);
    const [options, setOptions] = useState<ApexOptions | null>(null);

    useEffect(() => {
        if (!props.data) {
            console.error('Props data is undefined or null:', props.data);
            return;  // Exit early if props.data is undefined or null
        }

        if (!Array.isArray(props.data) || props.data.length === 0) {
            console.error('Props data is not an array or is an empty array:', props.data);
            return;  // Exit early if props.data is not an array or is an empty array
        }
        setSeries([
            {
                name: 'Total Sales',
                type: 'line',
                data: props.data.map(item => item?.Total_Sales || 0)
            },
            {
                name: 'Total Gross Profit',
                type: 'bar',
                data: props.data.map(item => item?.Total_Gross_Profit || 0)
            },
            {
                name: 'Total Sales Bar',
                type: 'bar',
                data: props.data.map(item => item?.Total_Sales || 0)
            },
            {
                name: 'Overall Gross Profit Rate',
                type: 'line',
                data: props.data.map(item => item?.Overall_Gross_Profit_Rate || 0)
            },
            // Add more series if needed
        ]);

        setOptions({
            chart: {
                height: 700,
                type: 'line',
            },
            stroke: {
                curve: 'stepline'
            },
            title: {
                text: ''
            },
            xaxis: {
                categories: props.data.map(item => item?.Sales_Month || ''),
                type: 'category',
                labels: {
                    style: {
                      colors: '#fff', // X-axis labels color
                    },
                  },
            },
            grid: {
                borderColor: '#e7e7e7' // Light gray border color for the grid
            },
            tooltip: {
                theme: 'dark' // Optional: if you want a dark theme tooltip like the first chart
            },

            yaxis: {
                title: {
                    text: 'Amount',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#fff'
                      }
                },
                labels: {
                    formatter: function (val) {
                 
                            return '¥' + val;
                      
                    },
                    style: {
                        colors: '#fff', // Y-axis labels color
                      },
                }
                
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                }
            },
            legend: {
                labels: {
                  colors: '#fff', // Legend text color
                },
                position: 'top',
                horizontalAlign: 'center'
              },
            colors: ['#425af5', '#5442f5', '#f5426f', '#000000']
        });
    }, [props.data]);

    const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden p-10 dark text-gray-950 bg-gray-900 border border-blue-700";

    
    return (
        <div className={chartContainerStyle} id="chart">
            {options && <ApexCharts options={options} series={series} type="line" height={700} width={"100%"}/>}
        </div>
    );
};


// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import { ApexOptions } from 'apexcharts';
// import ReactSlider from 'react-slider';
// import './../styles/slider.css';

// const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// // Define a custom type for the series
// interface MixedChartSeries {
//   name: string;
//   type: 'line' | 'bar';
//   data: number[];
// }

// // Define the component's prop types
// interface MainChartComponentProps {
//   data: { Total_Sales: number; Total_Gross_Profit: number; Overall_Gross_Profit_Rate: number; Sales_Date: string }[];
// }

// export default function MainChartComponent(props: MainChartComponentProps) {
//   const [series, setSeries] = useState<MixedChartSeries[]>([]);
//   const [options, setOptions] = useState<ApexOptions | null>(null);

//   // Determine the unique years from the data
//   const months = useMemo(() => {
//     const uniqueMonths = new Set(props.data.map(item => {
//       const date = new Date(item.Sales_Date);
//       return `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as "YYYY-MM"
//     }));
//     return Array.from(uniqueMonths).sort();
//   }, [props.data]);

//   // Set the initial year range state
//   const [monthRange, setMonthRange] = useState([months[0], months[months.length - 1]]);
//   // Filter the data based on the year range
//   const filteredData = useMemo(() => {
//     return props.data.filter(item => {
//         const date = new Date(item.Sales_Date);
//         const monthStr = `${date.getFullYear()}-${date.getMonth() + 1}`;
//        return monthStr >= monthRange[0] && monthStr <= monthRange[1];
//     });
//   }, [props.data, monthRange]);

//   useEffect(() => {
//     setSeries([
//       {
//         name: 'Total Sales',
//         type: 'line',
//         data: filteredData.map(item => item.Total_Sales)
//       },
//       {
//         name: 'Total Gross Profit',
//         type: 'bar',
//         data: filteredData.map(item => item.Total_Gross_Profit)
//       },
//       {
//         name: 'Total Sales Bar',
//         type: 'bar',
//         data: filteredData.map(item => item?.Total_Sales || 0)
//      },
//       {
//         name: 'Overall Gross Profit Rate',
//         type: 'line',
//         data: filteredData.map(item => item.Overall_Gross_Profit_Rate)
//       },
//     ]);

//     setOptions({
//       chart: {
//         height: 700,
//         type: 'line',
//       },
//       stroke: {
//         curve: 'stepline'
//       },
//       title: {
//         text: 'Sales and Profit Analysis'
//       },
//       xaxis: {
//         categories: filteredData.map(item => `${new Date(item.Sales_Date).getFullYear()}-${new Date(item.Sales_Date).getMonth() + 1}`),
//         type: 'category'
//       },
//       grid: {
//         borderColor: '#e7e7e7'
//       },
//       tooltip: {
//         theme: 'dark'
//       },
//       yaxis: {
//         title: {
//           text: 'Amount'
//         },
//         labels: {
//           formatter: function (val) {
//             return '$' + val.toFixed(2);
//           }
//         }
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '80%',
//         }
//       },
//       colors: ['#425af5', '#5442f5', '#f5426f', '#42f5e0']
//     });
//   }, [filteredData]);

//   // Create year labels for the slider
//   const monthLabels = months.map(month => (
//     <div key={month} className="month-label" style={{ left: `${(months.indexOf(month) / (months.length - 1)) * 100}%` }}>
//       {month}
//     </div>
//   ));


//   const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden bg-white p-10";

//   return (
//     <div className={chartContainerStyle} id="chart">
//       <div className='slider-container'>
//         <ReactSlider
//           className="horizontal-slider"
//           thumbClassName="thumb"
//           trackClassName="track"
//           defaultValue={[months.indexOf(monthRange[0]), months.indexOf(monthRange[1])]}
//           ariaLabel={['Lower thumb', 'Upper thumb']}
//           ariaValuetext={state => `Year range between ${state[0]} and ${state[1]}`}
//           onChange={values => setMonthRange([months[values[0]], months[values[1]]])}
//           min={months[0]}
//           max={months[months.length - 1]}
//           minDistance={0}
//         />
//         <div className="year-labels">{monthLabels}</div>
//       </div>
//       {options && <ApexCharts options={options} series={series} type="line" height={700} width={"100%"}/>}
//     </div>
//   );
// };

