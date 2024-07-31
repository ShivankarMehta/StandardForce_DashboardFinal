// // "use server";
// import { SalesTotalOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title } from "@tremor/react";

// const valueFormatter = async function (number: number) {
//    return "$ " + new Intl.NumberFormat("us").format(number).toString();
// };

// type MyComponentProps = {
//    data: SalesTotalOverTime[];
// };

// export default async function AreaChartComponent(props: MyComponentProps) {
//    const { data } = props;
//    const keys = Object.keys(data[0]);
//    console.log(keys);
//    return (
//       <Card>
//          <Title>Sales Over Time</Title>
//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={data}
//             yAxisWidth={100}
//             maxValue={300000000}
//             index={keys[0]}
//             categories={[keys[1]]}
//             colors={["indigo", "cyan"]}
//             //   valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }

// 'use client'
// import React, { useState, useMemo } from 'react';
// import { SalesTotalOverTime } from "@/app/lib/definitions";
// import { AreaChart, Card, Title, Button } from "@tremor/react"; // Include Button if available in your UI library

// type MyComponentProps = {
//    data: SalesTotalOverTime[];
// };

// export default function AreaChartComponent({ data }: MyComponentProps) {
//    const [selectedYear, setSelectedYear] = useState<string>('All');

//    // Extract unique years from the data
//    const years = useMemo(() => {
//       const uniqueYears = new Set(data.map(item => {
//          const dateStr = item.date instanceof Date ? item.date.toISOString() : item.date;
//          return dateStr.split('-')[0];
//       }));
//       return Array.from(uniqueYears);
//    }, [data]);

//    // Filter data based on selected year
//    const filteredData = useMemo(() => {
//       return selectedYear !== 'All' ? data.filter(item => {
//          const dateString = item.date instanceof Date ? item.date.toISOString() : item.date;
//          return dateString.startsWith(selectedYear);
//       }) : data;
//    }, [data, selectedYear]);

//    const keys = Object.keys(data[0] || {});

//    return (
//       <Card>
//          <Title>Sales Over Time</Title>
//          <div className='mt-2'>
//    <select 
//       value={selectedYear} 
//       onChange={(e) => setSelectedYear(e.target.value)}
//       className="block w-full bg-white border border-indigo-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//    >
//       <option value="All">Show All</option>
//       {years.map(year => (
//          <option key={year} value={year}>{year}</option>
//       ))}
//    </select>
// </div>

//          <AreaChart
//             className="h-96 mt-4"
//             showAnimation={true}
//             data={filteredData}
//             yAxisWidth={100}
//             maxValue={300000000}
//             index={keys[0]}
//             categories={[keys[1]]}
//             colors={["indigo", "cyan"]}
//             // valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }

'use client'
import React, { useState, useMemo } from 'react';
import { SalesTotalOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";
import ReactSlider from 'react-slider';
import "../../styles/slider.css"

// Define the component's prop types
type MyComponentProps = {
  data: SalesTotalOverTime[];
};

// The React component
export default function AreaChartComponent({ data }: MyComponentProps) {
  // Determine the unique years from the data
  const years = useMemo(() => {
    const uniqueYears = new Set(data.map(item => {
      const dateStr = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
      return dateStr;
    }));
    return Array.from(uniqueYears).sort((a, b) => a - b);
  }, [data]);

  // Set the initial year range state
  const [yearRange, setYearRange] = useState([years[0], years[years.length - 1]]);

  // Filter the data based on the year range
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const year = item.date instanceof Date ? item.date.getFullYear() : parseInt(item.date.split('-')[0], 10);
      return year >= yearRange[0] && year <= yearRange[1];
    });
  }, [data, yearRange]);

  // Extract the keys for the chart
  const keys = Object.keys(data[0] || {});

  // Create year labels for the slider
  const yearLabels = years.map(year => (
    <div key={year} className="year-label" style={{ left: `${((year - years[0]) / (years[years.length - 1] - years[0])) * 100}%` }}>
      {year}
    </div>
  ));

  // Render the component
  return (
    <Card className='dark bg-gray-900 border border-gray-200'>
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
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}
