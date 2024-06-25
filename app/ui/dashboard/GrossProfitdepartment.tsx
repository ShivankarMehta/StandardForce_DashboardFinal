// import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
// import { Metric, Subtitle, Bold, Italic, Text } from "@tremor/react";

// const valueFormatter = (number) =>
//    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

// export default function GrossProfitDepartment(props: any) {
//    return (
//       <Card >
//          <Title>Gross Profit By Departments</Title>
//          <Subtitle>
//             This chart shows Gross Profit against Department Name.
//          </Subtitle>
//          <BarChart
//             className="mt-6 h-96"
//             data={props.data}
//             showAnimation={true}
//             index="Department"
//             maxValue={14}
//             yAxisWidth={100}
//             categories={["GrossProfitRate", "Department"]}
//             colors={["blue"]}
//             //   valueFormatter={valueFormatter}
//          />
//       </Card>
//    );
// }
'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataItem {
  Department: string;
  GrossProfitRate: string; // Assuming this matches the output from your SQL query
}

interface GrossProfitDepartmentProps {
  data: DataItem[];
}

const GrossProfitDepartment: React.FC<GrossProfitDepartmentProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parse GrossProfitRate to float and handle undefined or NaN cases
  const series = data.map(item => parseFloat(item.GrossProfitRate) || 0);
  const labels = data.map(item => item.Department);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
    },
    labels,
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };
  const chartContainerStyle = "shadow-lg rounded-lg overflow-hidden bg-white p-4";
  return (
    <div className={chartContainerStyle}>
      <h1>Gross Profit By Departments</h1>
      <p>This chart shows the Gross Profit by Department.</p>
      {isClient && (
        <ReactApexChart options={options} series={series} type="pie" height={350} width={"100%"}/>
      )}
    </div>
  );
};

export default GrossProfitDepartment;


