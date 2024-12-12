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
                      colors: '#0A0A0A', // X-axis labels color
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
                        color: '#0A0A0A'
                      }
                },
                labels: {
                    formatter: function (val) {
                 
                            return '¥' + val;
                      
                    },
                    style: {
                        colors: '#0A0A0A', // Y-axis labels color
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
                  colors: '#0A0A0A', // Legend text color
                },
                position: 'top',
                horizontalAlign: 'center'
              },
            colors: ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']
        });
    }, [props.data]);

    const chartContainerStyle = "rounded-lg overflow-hidden p-10 text-gray-950 m-10";

    
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

// "use client"

// import * as React from "react"
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// interface ChartData {
//     Sales_Month: string; // Month
//     Total_Sales: number; // Sales data
//     Total_Gross_Profit: number; // Profit data
//     Overall_Gross_Profit_Rate: number; // Profit rate
//   }

// const chartConfig = {
//   sales: {
//     label: "Total Sales",
//     color: "hsl(var(--chart-1))",
//   },
//   profit: {
//     label: "Total Profit",
//     color: "hsl(var(--chart-2))",
//   },
//   rate: {
//     label: "Gross Profit Rate",
//     color: "hsl(var(--chart-3))",
//   },
// } satisfies ChartConfig

// export default function StackedAreaChartComponent({ data}: {data:ChartData[]}) {
//   const [timeRange, setTimeRange] = React.useState("90d")

//   // Filtered data logic
//   const filteredData = React.useMemo(() => {
//     return data // Apply filtering logic here if required
//   }, [data])

//   return (
//     <Card>
//       <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
//         <div className="grid flex-1 gap-1 text-center sm:text-left">
//           <CardTitle>Stacked Area Chart</CardTitle>
//           <CardDescription>
//             Visualizing sales, profit, and profit rate over time
//           </CardDescription>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger
//             className="w-[160px] rounded-lg sm:ml-auto"
//             aria-label="Select a time range"
//           >
//             <SelectValue placeholder="Last 3 months" />
//           </SelectTrigger>
//           <SelectContent className="rounded-xl">
//             <SelectItem value="90d" className="rounded-lg">
//               Last 3 months
//             </SelectItem>
//             <SelectItem value="30d" className="rounded-lg">
//               Last 30 days
//             </SelectItem>
//             <SelectItem value="7d" className="rounded-lg">
//               Last 7 days
//             </SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[350px] w-full"
//         >
//           <AreaChart data={filteredData}>
//             <defs>
//               {/* Gradient fills */}
//               <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-sales)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-sales)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-profit)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-profit)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-rate)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-rate)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>

//             {/* Chart Grid and Axes */}
//             <CartesianGrid vertical={false} strokeDasharray="3 3" />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => {
//                 const date = new Date(value)
//                 return date.toLocaleDateString("en-US", {
//                   month: "short",
//                   year: "numeric",
//                 })
//               }}
//             />
//             <YAxis
//               tickFormatter={(value) => `¥${value.toLocaleString()}`}
//               tickLine={false}
//               axisLine={false}
//             />

//             {/* Tooltip */}
//             <ChartTooltip
//               cursor={false}
//               content={(
//                 <ChartTooltipContent
//                   labelFormatter={(value) =>
//                     new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       year: "numeric",
//                     })
//                   }
//                   indicator="dot"
//                 />
//               )}
//             />

//             {/* Area Charts */}
//             <Area
//               dataKey="sales"
//               type="natural"
//               fill="url(#fillSales)"
//               stroke="var(--color-sales)"
//               stackId="1"
//             />
//             <Area
//               dataKey="profit"
//               type="natural"
//               fill="url(#fillProfit)"
//               stroke="var(--color-profit)"
//               stackId="1"
//             />
//             <Area
//               dataKey="rate"
//               type="natural"
//               fill="url(#fillRate)"
//               stroke="var(--color-rate)"
//               stackId="1"
//             />

//             {/* Chart Legend */}
//             <ChartLegend content={<ChartLegendContent />} />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
