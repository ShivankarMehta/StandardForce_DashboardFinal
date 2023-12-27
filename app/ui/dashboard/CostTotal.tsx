// // "use server";
// import { AreaChart, Card, Title } from "@tremor/react";

// const valueFormatter = async function (number: number) {
//    return "$ " + new Intl.NumberFormat("us").format(number).toString();
// };

// export default async function CostTotal(props: any) {
//    const { data } = props;
//    // console.log("Inside the component", data);
//    const keys = Object.keys(data[0]);
//    console.log(keys);
//    return (
//       <Card>
//          <Title>Costs Over Time</Title>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={data}
//             maxValue={320000000}
//             yAxisWidth={100}
//             index={keys[0]}
//             categories={[keys[1]]}
//             colors={["cyan", "indigo"]}
//             //   valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }


'use client'
import React, { useState, useMemo } from 'react';
import { SalesTotalOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title, Button } from "@tremor/react"; // Include Button if available in your UI library
import ReactSlider from 'react-slider';
import './../styles/slider.css'

type MyComponentProps = {
   data: SalesTotalOverTime[];
};

export default function AreaChartComponent({ data }: MyComponentProps) {
   const [selectedYear, setSelectedYear] = useState<string>('All');

   // Extract unique years from the data
   const years = useMemo(() => {
      const uniqueYears = new Set(data.map(item => {
         const dateStr = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
         return dateStr;
       }));
       return Array.from(uniqueYears).sort((a, b) => a - b);
     }, [data]);


   const [yearRange, setYearRange] = useState([years[0], years[years.length - 1]]);
   // Filter data based on selected year
   const filteredData = useMemo(() => {
      return data.filter(item => {
         const year = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
         return year >= yearRange[0] && year <= yearRange[1];
       });
     }, [data, yearRange]);

   const keys = Object.keys(data[0] || {});
   const yearLabels = years.map(year => (
      <div key={year} className="year-label" style={{ left: `${((year - years[0]) / (years[years.length - 1] - years[0])) * 100}%` }}>
        {year}
      </div>
    ));

   return (
      <Card>
         <Title>Cost Over Time</Title>
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
            yAxisWidth={100}
            maxValue={300000000}
            index={keys[0]}
            categories={[keys[1]]}
            colors={["cyan","indigo"]}
            // valueFormatter={valueFormatter}
         />
      </Card>
   );
}
