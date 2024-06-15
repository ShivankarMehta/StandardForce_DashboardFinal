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
matter_name: string;
total_profit: number;
};



// The React component
const MattersTableComponent: React.FC<any> = ({ data}) => {

  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  // Render the component
  return (
    <Card className="w-full">
    <Title>Matters & Total_Profit</Title>
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
          {data.map((item, index) => (
            <TableRow key={index} className="even:bg-gray-50">
              <TableCell className="px-4 py-2 text-left">{item.matter_name}</TableCell>
              <TableCell className="px-4 py-2 text-left">${item.total_profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TremorTable>
    </div>
  </Card>
  );
}

export default MattersTableComponent;
