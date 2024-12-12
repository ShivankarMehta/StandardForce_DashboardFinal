'use client'
import React, {useMemo } from 'react';
import { LineChart, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: {product_name:string, total_profit:number}[];
};

// The React component
export default function ProductProfitComponentLine({ data }: MyComponentProps) {
  
    const keys = useMemo(() => {
        if (data.length > 0) {
          return Object.keys(data[0]);
        }
        return [];
      }, [data]);
  // Render the component
  return (
    <Card className='w-full border border-blue-700'>
      <LineChart
        className="h-96 mt-4 w-full"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={400000}
        index="product_name"
        categories={["total_profit"]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}