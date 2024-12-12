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
department_name: string;
total_profit: number;
};



// The React component
const DepartmentTableComponent: React.FC<any> = ({ data}) => {

  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  // Render the component
  return (
    <div className="overflow-x-auto border-2 border-blue-700 rounded-md">
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
            <TableRow key={index} className="border-spacing-1 bg-gray-900 text-white">
              <TableCell className="px-4 py-2 text-left">{item.department_name}</TableCell>
              <TableCell className="px-4 py-2 text-left">¥{item.total_profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TremorTable>
    </div>
  );
}

export default DepartmentTableComponent;
