'use client'
import React, { useMemo } from 'react';
import { BarChart, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: {supplier_name:string, Quote_Quantity:number}[];
};

// The React component
export default function ProductsPerSupplierComponentBar({ data }: MyComponentProps) {
  
    const keys = useMemo(() => {
        if (data.length > 0) {
          return Object.keys(data[0]);
        }
        return [];
      }, [data]);
  // Render the component
  return (
    <Card className='w-full border border-blue-700'>
      <BarChart
        className="h-96 mt-4 w-full text-xs"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={100000}
        index="supplier_name"
        categories={["Quote_Quantity"]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}