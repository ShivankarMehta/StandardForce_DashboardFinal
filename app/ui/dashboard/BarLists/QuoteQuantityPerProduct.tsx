'use client'
import React, { useMemo } from 'react';
import { BarList, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: { product_name: string, Quote_Quantity: number }[];
};

// The React component
export default function QuoteQuantityPerProductComponentBar({ data }: MyComponentProps) {

  // Transform the data to fit the BarList format
  const transformedData = useMemo(() => {
    return data.map(item => ({
      name: item.product_name?.toString(),
      value: item.Quote_Quantity ?? 0,
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

