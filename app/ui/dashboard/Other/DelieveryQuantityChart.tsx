// // "use server";
// import { SalesTotalOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title } from "@tremor/react";
// const valueFormatter = async function (number: number) {
//    return "$ " + new Intl.NumberFormat("us").format(number).toString();
// };

// export default async function DelieveryQuantityChartComponent(props: any) {
//    const { data } = props;
//    // console.log("Inside the component", data);
//    return (
//       <Card >
//          <Title>Delievery Quantity Over Time</Title>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={data}
//             autoMinValue={true}
//             maxValue={360000}
//             yAxisWidth={100}
//             index="sales_date"
//             categories={["Date", "TotalDeliveryQuantity"]}
//             colors={["cyan","indigo"]}
//             //   valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }



// 'use client'
// import React, { useState, useMemo } from 'react';
// import { DeliveryQuantityOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title, Button } from "@tremor/react";
// type MyComponentProps = {
//    data: DeliveryQuantityOverTime[];
// };

// export default function DelieveryQuantityChartComponent({ data }: MyComponentProps) {
//    const [selectedYear, setSelectedYear] =useState<string>('All');
//    // Extract unique years from the data
//    const years = useMemo(() => {
//       const uniqueYears = new Set(data.map(item => {
//          // Ensure item.date is defined and is a string or Date
//          if (item.date) {
//             const dateStr = item.date instanceof Date ? item.date.toISOString() : item.date;
//             return dateStr.split('-')[0];
//          }
//          return null; // Return null for items without a valid date
//       }).filter(year => year !== null)); // Filter out null values
//       return Array.from(uniqueYears);
//    }, [data]);


//    // Filter data based on selected year
//    const filteredData = useMemo(() => {
//       return selectedYear !== 'All' ? data.filter(item => {
//          if (item.date) {
//             const dateString = item.date instanceof Date ? item.date.toISOString() : item.date;
//             return dateString.startsWith(selectedYear);
//          }
//          return false; // Exclude items without a valid date
//       }) : data;
//    }, [data, selectedYear]);

//    const handleYearClick = (year: string | null) => {
//       if (year) {
//          setSelectedYear(year);
//       }
//    };

//    return (
//       <Card>
//          <Title>Delievery Quantity Over Time</Title>
//          <div className="flex flex-wrap gap-2 mt-2">
//             {years.map(year => (
//                <Button 
//                   key={year} 
//                   onClick={() => handleYearClick(year)}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded myCustomButtonClass"
//                >
//                   {year}
//                </Button>
//             ))}
//             <Button 
//                onClick={() => setSelectedYear('All')}
//                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded myCustomButtonClass"
//             >
//                Show All
//             </Button>
//          </div>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={filteredData}
//             autoMinValue={true}
//             maxValue={360000}
//             yAxisWidth={100}
//             index="date"
//             categories={["Date", "TotalDeliveryQuantity"]}
//             colors={["cyan","indigo"]}
//          />
//       </Card>
//    );
// }


// 'use client'
// import React, { useState, useMemo } from 'react';
// import { DeliveryQuantityOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title } from "@tremor/react";
// import ReactSlider from 'react-slider';
// import './../styles/slider.css';

// type MyComponentProps = {
//    data: DeliveryQuantityOverTime[];
// };

// export default function DelieveryQuantityChartComponent({ data }: MyComponentProps) {
//    // Extract unique years from the data
//    const years = useMemo(() => {
//       const uniqueYears = new Set(data.map(item => {
//          const dateStr = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
//          return dateStr;
//        }));
//        return Array.from(uniqueYears).sort((a, b) => a - b);
//      }, [data]);

//    const [yearRange, setYearRange] = useState([years[0], years[years.length - 1]]);

//    // Filter data based on selected year range
//    const filteredData = useMemo(() => {
//       return data.filter(item => {
//          const year = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
//          return year >= yearRange[0] && year <= yearRange[1];
//        });
//      }, [data, yearRange]);

//    const yearLabels = years.map(year => (
//       <div key={year} className="year-label" style={{ left: `${((year - years[0]) / (years[years.length - 1] - years[0])) * 100}%` }}>
//         {year}
//       </div>
//     ));

//    return (
//       <Card>
//          <Title>Delivery Quantity Over Time</Title>
//          <div className='slider-container'>
//             <ReactSlider
//               className="horizontal-slider"
//               thumbClassName="thumb"
//               trackClassName="track"
//               defaultValue={[yearRange[0], yearRange[1]]}
//               ariaLabel={['Lower thumb', 'Upper thumb']}
//               ariaValuetext={state => `Year range between ${state[0]} and ${state[1]}`}
//               onChange={values => setYearRange(values)}
//               min={years[0]}
//               max={years[years.length - 1]}
//               minDistance={0}
//             />
//             <div className="year-labels">{yearLabels}</div>
//          </div>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={filteredData}
//             autoMinValue={true}
//             maxValue={360000}
//             yAxisWidth={100}
//             index="date"
//             categories={["Date", "TotalDeliveryQuantity"]}
//             colors={["cyan","indigo"]}
//          />
//       </Card>
//    );
// }


// 'use client'
// import React, { useState, useMemo } from 'react';
// import { DeliveryQuantityOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title } from "@tremor/react";
// import ReactSlider from 'react-slider';
// import './../styles/slider.css'; // Ensure this file contains custom styles for ReactSlider

// type MyComponentProps = {
//    data: DeliveryQuantityOverTime[];
// };

// export default function DeliveryQuantityChartComponent({ data }: MyComponentProps) {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Extract unique years from the data
//     const years = useMemo(() => {
//         const uniqueYears = new Set(data.map(item => {
//             const date = item.date instanceof Date ? item.date : new Date(item.date);
//             return date.getFullYear();
//         }));
//         return Array.from(uniqueYears).sort((a, b) => a - b);
//     }, [data]);

//     const [selectedYear, setSelectedYear] = useState(years[0]);
//     const [monthRange, setMonthRange] = useState([0, 11]);

//     // Filter data based on selected year and month range
//     const filteredData = useMemo(() => {
//         return data.filter(item => {
//             const date = item.date instanceof Date ? item.date : new Date(item.date);
//             const year = date.getFullYear();
//             const month = date.getMonth(); // getMonth() is zero-indexed
//             return year === selectedYear && month >= monthRange[0] && month <= monthRange[1];
//         });
//     }, [data, selectedYear, monthRange]);

//     return (
//         <Card>
//             <div className="flex flex-col space-y-4 text-left my-5">
//                 <div className="border-2 w-20">
//                     <select
//                         value={selectedYear}
//                         onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                         className="form-select block w-full mt-1"
//                     >
//                         {years.map(year => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="slider-with-months w-full">
//                     <ReactSlider
//                         className="horizontal-slider"
//                         thumbClassName="thumb"
//                         trackClassName="track"
//                         value={[monthRange[0], monthRange[1]]}
//                         ariaLabel={['Lower thumb', 'Upper thumb']}
//                         ariaValuetext={state => `Month range between ${months[state.value[0]]} and ${months[state.value[1]]}`}
//                         onChange={values => setMonthRange(values)}
//                         min={0}
//                         max={11}
//                         minDistance={1}
//                     />
//                     <div className="month-labels flex justify-between mt-2">
//                         {months.map((month, index) => (
//                             <div key={index} className="text-xs text-center">{month}</div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <AreaChart
//                 className="h-96 mt-4"
//                 showAnimation={true}
//                 data={filteredData}
//                 autoMinValue={true}
//                 maxValue={360000}
//                 yAxisWidth={100}
//                 index="date"
//                 categories={["Date", "TotalDeliveryQuantity"]}
//                 colors={["cyan","indigo"]}
//             />
//         </Card>
//     );
// }

'use client'
import React, { useState, useMemo } from 'react';
import { DeliveryQuantityOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";
import ReactSlider from 'react-slider';
import '../../styles/slider.css'

type MyComponentProps = {
   data: DeliveryQuantityOverTime[];
};

export default function DeliveryQuantityChartComponent({ data }: MyComponentProps) {
    // Adjusted month labels for fiscal year starting from October
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"];
    const fiscalMonthIndex = (date: Date) => (date.getMonth() + 3) % 12;

    // Extract unique years adjusted for fiscal year starting in October
    const years = useMemo(() => {
        const uniqueYears = new Set(data.map(item => {
            const date = item.date instanceof Date ? item.date : new Date(item.date);
            const year = date.getFullYear();
            return fiscalMonthIndex(date) < 3 ? year - 1 : year;
        }));
        return Array.from(uniqueYears).sort((a, b) => a - b);
    }, [data]);

    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [monthRange, setMonthRange] = useState([0, 11]);

    // Filter data based on selected fiscal year and month range
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const date = item.date instanceof Date ? item.date : new Date(item.date);
            const year = date.getFullYear();
            const fiscalYear = fiscalMonthIndex(date) < 3 ? year - 1 : year;
            const month = fiscalMonthIndex(date);
            return fiscalYear === selectedYear && month >= monthRange[0] && month <= monthRange[1];
        });
    }, [data, selectedYear, monthRange]);

    return (
        <Card className='dark bg-slate-800 border border-blue-700'>
            <div className="flex flex-col space-y-4 text-left my-5">
                <div className="border-1 w-40 outline-none rounded-md">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="form-select block w-full mt-1 bg-slate-900 text-white"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="slider-with-months w-full">
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        value={[monthRange[0], monthRange[1]]}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        ariaValuetext={state => `Month range between ${months[state.value[0]]} and ${months[state.value[1]]}`}
                        onChange={values => setMonthRange(values)}
                        min={0}
                        max={11}
                        minDistance={1}
                    />
                    <div className="month-labels flex justify-between mt-2 text-white">
                        {months.map((month, index) => (
                            <div key={index} className="text-xs text-center">{month}</div>
                        ))}
                    </div>
                </div>
            </div>
            <AreaChart
                className="h-96 mt-4"
                showAnimation={true}
                data={filteredData}
                autoMinValue={true}
                maxValue={750000}
                yAxisWidth={100}
                index="date"
                categories={["Date", "TotalDeliveryQuantity"]}
                colors={["cyan","indigo"]}
            />
        </Card>
    );
}

