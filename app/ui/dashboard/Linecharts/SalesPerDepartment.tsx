'use client'
import React, { useMemo } from 'react';
import { LineChart, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: {construction_name:string, total_sales:number}[];
};

// The React component
export default function SalesPerDepartmentLine({ data }: MyComponentProps) {
  
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
        maxValue={1300000000}
        index="department_name"
        categories={["total_sales"]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}