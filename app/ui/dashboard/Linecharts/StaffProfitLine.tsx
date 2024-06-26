'use client'
import React, {useMemo } from 'react';
import { LineChart, Card, Title } from "@tremor/react";

// Define the component's prop types
type MyComponentProps = {
  data: {staff_name:string, total_profit:number}[];
};

// The React component
export default function StaffSalesComponentLine({ data }: MyComponentProps) {
  
    const keys = useMemo(() => {
        if (data.length > 0) {
          return Object.keys(data[0]);
        }
        return [];
      }, [data]);
  // Render the component
  return (
    <Card className='w-full'>
      <LineChart
        className="h-96 mt-4 w-full"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={220000000}
        index="staff_name"
        categories={["total_profit"]}
        colors={["teal", "cyan"]}
      />
    </Card>
  );
}