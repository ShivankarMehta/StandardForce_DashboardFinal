'use client'
import React, { useMemo } from 'react';
import { BarList, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: { supplier_name: string, Quote_Quantity: number }[];
};

// Function to assign colors
const getColor = (index: number) => {
  const colors = "stone"; // Define your color palette
  return colors;
};

// The React component
export default function QuoteQuantityPerSupplierComponentBar({ data }: MyComponentProps) {

  // Transform the data to fit the BarList format
  const transformedData = useMemo(() => {
    return data.map((item, index) => ({
      name: item.supplier_name?.toString(),
      value: item.Quote_Quantity ?? 0,
      color: getColor(index), // Assign color
    }));
  }, [data]);

  // Render the component
  return (
    <Card className='w-full dark bg-gray-900 border border-blue-700'>
      <BarList
        className="h-100 mt-4 w-full text-xs"
        data={transformedData}
        showAnimation={true}
      />
    </Card>
  );
}
