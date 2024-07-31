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
  Date: string;
  SalesStock: number;
  SalesQuantity:number;
  DeliveryQuantity:number
};

// The React component
const ComparisionTableComponent: React.FC<any> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
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
    if (selectedYear === 'All') return data;
    const filteredByYear = data.filter(item => item.Date.startsWith(selectedYear));
    if (selectedMonth === 'All') return filteredByYear;
    return filteredByYear.filter(item => item.Date.startsWith(`${selectedYear}-${selectedMonth}`));
  }, [data, selectedYear, selectedMonth]);

  const uniqueYears: any = useMemo(() => Array.from(new Set(data.map(item => item.Date.split('-')[0]))), [data]);
  const uniqueMonths: any = useMemo(() => {
    if (selectedYear === 'All') return [];
    const months = data
      .filter(item => item.Date.startsWith(selectedYear))
      .map(item => item.Date.split('-')[1]);
    return Array.from(new Set(months));
  }, [data, selectedYear]);

  // Render the component
  return (
    <Card className="w-full border border-blue-700">
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
      {selectedYear !== 'All' && (
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
      <div className="overflow-x-auto border-2 rounded-md">
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
                <TableCell className="px-4 py-2 text-left">{item.Date}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.SalesStock}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.SalesQuantity}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.DeliveryQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TremorTable>
      </div>
    </Card>
  );
}

export default ComparisionTableComponent;
