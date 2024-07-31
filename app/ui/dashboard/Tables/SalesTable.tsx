'use client'
// import React, { useState, useMemo } from 'react';
// import { Card, Title } from '@tremor/react';
// import {
//   Table as TremorTable,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
// } from '@tremor/react';
// // Define the component's prop types
// type SalesTotalOverTime = {
//   date: string;
//   TotalSales: number;
// };

// type TableProps = {
//   data: SalesTotalOverTime[];
// };

// // The React component
// const SalesTableComponent: React.FC<TableProps> = ({ data }) => {
//   const [selectedYear, setSelectedYear] = useState<string>('All');

//   const keys = useMemo(() => {
//     if (data.length > 0) {
//       return Object.keys(data[0]);
//     }
//     return [];
//   }, [data]);

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedYear(event.target.value);
//   };

//   const filteredData = selectedYear === 'All'
//     ? data
//     : data.filter(item => item.date.startsWith(selectedYear));

//   const uniqueYears = useMemo(() => Array.from(new Set(data.map(item => item.date.split('-')[0]))), [data]);

//   // Render the component
//   return (
//     <Card className="w-full">
//       <Title>Sales Over Time</Title>
//       <div className="mb-4">
//         <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700">
//           Select Year:
//         </label>
//         <select
//           id="yearSelect"
//           value={selectedYear}
//           onChange={handleYearChange}
//           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//         >
//           <option value="All">All</option>
//           {uniqueYears.map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <div className="overflow-x-auto">
//         <TremorTable className="mt-4 w-full">
//           <TableHead>
//             <TableRow className="bg-gray-200">
//               {keys.map((key) => (
//                 <TableHeaderCell key={key} className="px-4 py-2 text-left">
//                   {key}
//                 </TableHeaderCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((item, index) => (
//               <TableRow key={index} className="even:bg-gray-50">
//                 <TableCell className="px-4 py-2 text-left">{item.date}</TableCell>
//                 <TableCell className="px-4 py-2 text-left">${item.TotalSales}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </TremorTable>
//       </div>
//     </Card>
//   );
// }

// export default SalesTableComponent;

'use client'
import React, { useState, useMemo } from 'react';
import { Card, Title } from '@tremor/react';
import {
  Table as TremorTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

// Define the component's prop types
type SalesTotalOverTime = {
  date: string;
  TotalSales: number;
};

type TableProps = {
  data: SalesTotalOverTime[];
};
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #64748b;
    border-radius: 10px;

  }
  ::-webkit-scrollbar-thumb:hover {
    background: #000;
  }
`;
// The React component
const SalesTableComponent: React.FC<TableProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const filteredData = selectedYear === 'All'
    ? data
    : data.filter(item => item.date.startsWith(selectedYear));

  const uniqueYears = useMemo(() => Array.from(new Set(data.map(item => item.date.split('-')[0]))), [data]);

  // Render the component
  return (
    <Card className="w-full dark bg-gray-900 rounded-md border border-blue-700">
      <style>{scrollbarStyles}</style>
      <div className="mb-4">
        <label htmlFor="yearSelect" className="block text-sm font-medium text-white">
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-700 text-white"
        >
          <option value="All">All</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-scroll border-2 rounded-md"> {/* Set fixed height and enable scrolling */}
          <TremorTable className="w-full dark">
            <TableHead>
              <TableRow className="bg-slate-700">
                {keys.map((key) => (
                  <TableHeaderCell key={key} className="px-4 text-left text-white">
                    {key}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="border-spacing-1 bg-gray-900 text-white">
                  <TableCell className="px-4 py-2 text-left">{item.date}</TableCell>
                  <TableCell className="px-4 py-2 text-left">¥ {item.TotalSales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TremorTable>
        </div>
      </div>
    </Card>
  );
}

export default SalesTableComponent;
