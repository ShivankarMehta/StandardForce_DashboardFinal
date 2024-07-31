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
  TotalDeliveryQuantity: number;
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
const DelieveryTableComponent: React.FC<any> = ({ data }) => {
  const uniqueYears: any = useMemo(() => Array.from(new Set(data.map(item => item.date.split('-')[0]))), [data]);

  const [selectedYear, setSelectedYear] = useState<string>(uniqueYears[0] || '');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');

  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setSelectedMonth('All'); // Reset month selection when year changes
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const filteredData = useMemo(() => {
    const filteredByYear = data.filter(item => item.date.startsWith(selectedYear));
    if (selectedMonth === 'All') return filteredByYear;
    return filteredByYear.filter(item => item.date.startsWith(`${selectedYear}-${selectedMonth}`));
  }, [data, selectedYear, selectedMonth]);

  const uniqueMonths: any = useMemo(() => {
    const months = data
      .filter(item => item.date.startsWith(selectedYear))
      .map(item => item.date.split('-')[1]);
    return Array.from(new Set(months));
  }, [data, selectedYear]);

  // Render the component
  return (
    <Card className="w-full bg-gray-900 border border-blue-700">
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
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {selectedYear !== '' && (
        <div className="mb-4">
          <label htmlFor="monthSelect" className="block text-sm font-medium text-white">
            Select Month:
          </label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-700 text-white"
          >
            <option value="All">All</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      )}
      <div className="overflow-x-auto">
      <div className="max-h-[500px] overflow-y-scroll border-2 rounded-md">
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
              <TableRow key={index} className="border-spacing-1  bg-gray-900 text-white">
                <TableCell className="px-4 py-2 text-left">{item.date}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.TotalDeliveryQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TremorTable>
        </div>
      </div>
    </Card>
  );
}

export default DelieveryTableComponent;
