// // "use server";
// import { SalesTotalOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title } from "@tremor/react";
// const valueFormatter = async function (number: number) {
//    return "$ " + new Intl.NumberFormat("us").format(number).toString();
// };

// export default async function SalesQuantityChartComponent(props: any) {
//    const { data } = props;
//    // console.log("Inside the component", data);
//    return (
//       <Card >
//          <Title>Sales Quantity Over Time</Title>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={data}
//             autoMinValue={true}
//             maxValue={50000}
//             yAxisWidth={100}
//             index="sales_date"
//             categories={["Date", "TotalQuantity"]}
//             colors={["indigo", "cyan"]}
//             //   valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }

// 'use client'
// import React, { useState, useMemo } from 'react';
// import { SalesQuantityOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title, Button } from "@tremor/react";
// type MyComponentProps = {
//    data: SalesQuantityOverTime[];
// };

// export default function SalesQuantityChartComponent({ data }: MyComponentProps) {
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
//          <Title>Sales Quantity Over Time</Title>
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
//             autoMinValue={false}
//             maxValue={50000}
//             yAxisWidth={100}
//             index="date"
//             categories={["Date", "TotalQuantity"]}
//             colors={["indigo", "cyan"]}
//          />
//       </Card>
//    );
// }


'use client'
import React, { useState, useMemo } from 'react';
import { SalesQuantityOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";
import ReactSlider from 'react-slider';
import '../../styles/slider.css'

type MyComponentProps = {
   data: SalesQuantityOverTime[];
};

export default function SalesQuantityChartComponent({ data }: MyComponentProps) {
   // Extract unique years from the data
   const years = useMemo(() => {
      const uniqueYears = new Set(data.map(item => {
         const dateStr = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
         return dateStr;
       }));
       return Array.from(uniqueYears).sort((a, b) => a - b);
     }, [data]);

   const [yearRange, setYearRange] = useState([years[0], years[years.length - 1]]);

   // Filter data based on selected year range
   const filteredData = useMemo(() => {
      return data.filter(item => {
         const year = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
         return year >= yearRange[0] && year <= yearRange[1];
       });
     }, [data, yearRange]);

   const yearLabels = years.map(year => (
      <div key={year} className="year-label" style={{ left: `${((year - years[0]) / (years[years.length - 1] - years[0])) * 100}%` }}>
        {year}
      </div>
    ));

   return (
      <Card className='dark border border-blue-700'>
         <div className='slider-container'>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              defaultValue={[yearRange[0], yearRange[1]]}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Year range between ${state[0]} and ${state[1]}`}
              onChange={values => setYearRange(values)}
              min={years[0]}
              max={years[years.length - 1]}
              minDistance={0}
            />
            <div className="year-labels">{yearLabels}</div>
         </div>
         <AreaChart
            className="h-96 mt-4"
            showAnimation={true}
            data={filteredData}
            autoMinValue={false}
            maxValue={50000}
            yAxisWidth={100}
            index="date"
            categories={["Date", "TotalQuantity"]}
            colors={["indigo", "cyan"]}
         />
      </Card>
   );
}
