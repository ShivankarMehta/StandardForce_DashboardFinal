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
    <Card className="w-full">
      <Title>Delievery Quantity Over Time</Title>
      <div className="mb-4">
        <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700">
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {selectedYear !== '' && (
        <div className="mb-4">
          <label htmlFor="monthSelect" className="block text-sm font-medium text-gray-700">
            Select Month:
          </label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="All">All</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      )}
      <div className="overflow-x-auto">
        <TremorTable className="mt-4 w-full">
          <TableHead>
            <TableRow className="bg-gray-200">
              {keys.map((key) => (
                <TableHeaderCell key={key} className="px-4 py-2 text-left">
                  {key}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index} className="even:bg-gray-50">
                <TableCell className="px-4 py-2 text-left">{item.date}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.TotalDeliveryQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TremorTable>
      </div>
    </Card>
  );
}

export default DelieveryTableComponent;
