'use client'
import React, { useState, useMemo } from 'react';
import { AreaChart, Card, Title } from "@tremor/react";
import '../../styles/slider.css'
// Define the component's prop types
type MyComponentProps = {
  data: {matter_name:string, total_profit:number}[];
};

// The React component
export default function MatterSalesComponent({ data }: MyComponentProps) {
  
    const keys = useMemo(() => {
        if (data.length > 0) {
          return Object.keys(data[0]);
        }
        return [];
      }, [data]);
  // Render the component
  return (
    <Card className='w-full'>
      <AreaChart
        className="h-96 mt-4 w-full text-xs"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={9000000}
        index="matter_name"
        categories={["total_profit"]}
        colors={["cyan","indigo"]}
      />
    </Card>
  );
}