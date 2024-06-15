'use client'
import React, { useEffect, useState } from 'react';
import { AreaChart, Card, Title } from "@tremor/react";
import { FunnelChart } from '@tremor/react';

type FunnelChartHeroProps = {
  data?: {
    List_Price: number,
    Current_Selling_Price: number,
    Current_Purchase_Price: number,
  };
};

export default function FunnelChartHero({ data }: FunnelChartHeroProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !data) {
    return <div>Loading...</div>; // Or handle the undefined data appropriately
  }

  const chartData = [
    { name: 'List Price', value: data.List_Price },
    { name: 'Current Selling Price', value: data.Current_Selling_Price },
    { name: 'Current Purchase Price', value: data.Current_Purchase_Price },
  ];

  return <Card className='w-full'>
    <FunnelChart 
    className="className=h-96 mt-4 w-full" 
    data={chartData} />
    </Card>;
}
