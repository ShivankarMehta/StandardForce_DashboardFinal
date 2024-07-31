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
type SalesPerYear = {
  month: string;
  sales_2022: number;
  sales_2023:number;
  sales_2031:number;
  sales_2032: number;
};

// The React component
const SalesPerYearTableComponent: React.FC<any> = ({ data }) => {

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  // Render the component
  return (
      <div className="border-2 border-blue-700 rounded-md">
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
            {data.map((item, index) => (
              <TableRow key={index} className="border-spacing-1  bg-gray-900 text-white">
                <TableCell className="px-4 py-2 text-left">{monthNames[parseInt(item.month) - 1]}</TableCell>
                <TableCell className="px-4 py-2 text-left">¥ {item.sales_2022}</TableCell>
                <TableCell className="px-4 py-2 text-left">¥{item.sales_2023}</TableCell>
                <TableCell className="px-4 py-2 text-left">¥ {item.sales_2031}</TableCell>
                <TableCell className="px-4 py-2 text-left">¥ {item.sales_2032}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TremorTable>
      </div>
  );
}

export default SalesPerYearTableComponent;

