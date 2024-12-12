'use client'
import React, { useMemo } from 'react';
import { AreaChart, Card, Title } from "@tremor/react";


// Define the component's prop types
type MyComponentProps = {
  data: {department_name:string, total_profit:number}[];
};

// The React component
export default function DepartmentSalesComponent({ data }: MyComponentProps) {
  
    const keys = useMemo(() => {
        if (data.length > 0) {
          return Object.keys(data[0]);
        }
        return [];
      }, [data]);
  // Render the component
  return (
    <Card className='w-full border border-blue-700'>
      <AreaChart
        className="h-96 mt-4 w-full"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={400000000}
        index="department_name"
        categories={["total_profit"]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}