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
Sales_Month: string;
Total_Sales: number;
Total_Gross_Profit:number;
Overall_Gross_Profit_Rate:number
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
const MainSalesTableComponent: React.FC<any> = ({ data }) => {
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
    : data.filter(item => item.Sales_Month.startsWith(selectedYear));

  const uniqueYears:any = useMemo(() => Array.from(new Set(data.map(item => item.Sales_Month.split('-')[0]))), [data]);

  // Render the component
  return (
  <div className='m-10'>
  <style>{scrollbarStyles}</style>
  <div className="mb-4">
    <label htmlFor="yearSelect" className="block text-sm font-medium text-white">
      Select Year:
    </label>
    <select
      id="yearSelect"
      value={selectedYear}
      onChange={handleYearChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-900 text-white"
    >
      <option value="All">All</option>
      {uniqueYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
  <div className="overflow-x-auto">
    <div className="max-h-[500px] overflow-y-scroll rounded-lg border border-gray-300 mb-10">
      <TremorTable className="table-fixed w-full border-collapse">
        <TableHead>
          <TableRow className="hover:bg-slate-200 bg-slate-900 hover:text-black text-white rounded-t-lg text-sm md:text-xl">
            {keys.map((key) => (
              <TableHeaderCell key={key} className="px-4 text-left">
                {key}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow
              key={index}
              className="border-spacing-1 bg-slate-100 hover:bg-slate-300 text-black"
            >
              <TableCell className="px-4 py-2 text-left">{item.Sales_Month}</TableCell>
              <TableCell className="px-4 py-2 text-left">¥ {item.Total_Sales}</TableCell>
              <TableCell className="px-4 py-2 text-left">¥ {item.Total_Gross_Profit}</TableCell>
              <TableCell className="px-4 py-2 text-left">{item.Overall_Gross_Profit_Rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TremorTable>
    </div>
  </div>
</div>
  );
}

export default MainSalesTableComponent;


// 'use client';
// import React, { useState, useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { CardContent } from "@/components/ui/card";

// // Define the component's prop types
// type SalesTotalOverTime = {
//   Sales_Month: string;
//   Total_Sales: number;
//   Total_Gross_Profit: number;
//   Overall_Gross_Profit_Rate: number;
// };

// const MainSalesTableComponent: React.FC<{ data: SalesTotalOverTime[] }> = ({ data }) => {
//   const [selectedYear, setSelectedYear] = useState<string>("All");

//   const keys = useMemo(() => {
//     if (data.length > 0) {
//       return Object.keys(data[0]);
//     }
//     return [];
//   }, [data]);

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedYear(event.target.value);
//   };

//   const filteredData =
//     selectedYear === "All"
//       ? data
//       : data.filter((item) => item.Sales_Month.startsWith(selectedYear));

//   const uniqueYears = useMemo(
//     () => Array.from(new Set(data.map((item) => item.Sales_Month.split("-")[0]))),
//     [data]
//   );

//   return (
//     <CardContent className="overflow-x-auto p-6">
//       <div className="mb-4">
//         <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700">
//           Select Year:
//         </label>
//         <select
//           id="yearSelect"
//           value={selectedYear}
//           onChange={handleYearChange}
//           className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         >
//           <option value="All">All</option>
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-gray-300">
//         <Table className="table-fixed w-full border-collapse">
//           {/* Header */}
//           <TableHeader>
//             <TableRow className="bg-gray-900 text-white text-sm">
//               {keys.map((key) => (
//                 <TableHead key={key} className="px-4 py-2 text-left">
//                   {key}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>

//           {/* Body */}
//           <TableBody>
//             {filteredData.map((item, index) => (
//               <TableRow
//                 key={index}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                 } hover:bg-gray-200 transition-all`}
//               >
//                 <TableCell className="px-4 py-2 text-left">{item.Sales_Month}</TableCell>
//                 <TableCell className="px-4 py-2 text-left">¥ {item.Total_Sales.toLocaleString()}</TableCell>
//                 <TableCell className="px-4 py-2 text-left">¥ {item.Total_Gross_Profit.toLocaleString()}</TableCell>
//                 <TableCell className="px-4 py-2 text-left">{item.Overall_Gross_Profit_Rate.toFixed(2)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </CardContent>
//   );
// };

// export default MainSalesTableComponent;
