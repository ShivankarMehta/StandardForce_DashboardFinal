'use client'
import React, { useMemo } from 'react';
import { SalesTotalOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";
import '../../styles/slider.css'
// Define the component's prop types
type MyComponentProps = {
  data: SalesTotalOverTime[];
};

// The React component
export default function TargetOverTimeComponent({ data }: MyComponentProps) {
  // Extract the keys for the chart
  const keys = Object.keys(data[0] || {});

  // Render the component
  return (
    <Card className='dark bg-gray-900 border border-blue-700'>
      <Title>Sales Target Over Time</Title>
      <AreaChart
        className="h-96 mt-4"
        showAnimation={true}
        data={data}
        yAxisWidth={100}
        maxValue={210000000}
        index={keys[0]}
        categories={[keys[1]]}
        colors={["indigo", "cyan"]}
      />
    </Card>
  );
}
