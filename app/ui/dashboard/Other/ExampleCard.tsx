// "use client";

// import {
//    BadgeDelta,
//    Card,
//    DeltaType,
//    Flex,
//    Grid,
//    Metric,
//    ProgressBar,
//    Text,
// } from "@tremor/react";

// type Kpi = {
//    title: string;
//    metric: string;
//    progress: number;
//    target: string;
//    delta: string;
//    deltaType: DeltaType;
// };

// const kpiData: Kpi[] = [
//    {
//       title: "Sales",
//       metric: "$ 12,699",
//       progress: 15.9,
//       target: "$ 80,000",
//       delta: "13.2%",
//       deltaType: "moderateIncrease",
//    },
//    {
//       title: "Profit",
//       metric: "$ 45,564",
//       progress: 36.5,
//       target: "$ 125,000",
//       delta: "23.9%",
//       deltaType: "increase",
//    },
//    {
//       title: "Sales Quantity",
//       metric: "1,072",
//       progress: 53.6,
//       target: "2,000",
//       delta: "10.1%",
//       deltaType: "moderateDecrease",
//    },
// ];

// export default function KpiCardGrid() {
//    return (
//       <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mb-6">
//          {kpiData.map((item) => (
//             <Card key={item.title}>
//                <Flex alignItems="start">
//                   <div className="truncate">
//                      <Text>{item.title}</Text>
//                      <Metric className="truncate">{item.metric}</Metric>
//                   </div>
//                   <BadgeDelta deltaType={item.deltaType}>
//                      {item.delta}
//                   </BadgeDelta>
//                </Flex>
//                <Flex className="mt-4 space-x-2">
//                   <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
//                   <Text className="truncate">{item.target}</Text>
//                </Flex>
//                <ProgressBar value={item.progress} className="mt-2" />
//             </Card>
//          ))}
//       </Grid>
//    );
// }

// ui/dashboard/ExampleCard.js

import React from "react";
import {
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";

// Define props structure with individual types for clarity
type KpiCardProps = {
  totalSales: number;
  totalQuantity: number;
  totalProfit: number;
};

const KpiCardGrid: React.FC<KpiCardProps> = ({
  totalSales,
  totalQuantity,
  totalProfit,
}) => {
  return (
    <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mb-6">
      {/* Sales Card */}
      <Card className="p-4 border bg-gray-900 dark border-gray-200 rounded-lg shadow-md">
        <Flex alignItems="start">
          <div className="truncate">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Total Sales
            </Text>
            <Metric className="text-2xl text-blue-600">{`¥${totalSales}`}</Metric>
          </div>
        </Flex>
        <Flex className="mt-4 space-x-2">
          <Text className="text-sm text-gray-600">{`Progress: 43%`}</Text>
          <Text className="text-sm text-gray-600">{`Target: ¥80000000000`}</Text>
        </Flex>
        <ProgressBar value={15.9} className="mt-2" />
      </Card>

      {/* Quantity Card */}
      <Card className="p-4 border bg-gray-900 dark border-gray-200 rounded-lg shadow-md">
        <Flex alignItems="start">
          <div className="truncate">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Total Sales Quantity
            </Text>
            <Metric className="text-2xl text-green-600">{totalQuantity}</Metric>
          </div>
        </Flex>
        <Flex className="mt-4 space-x-2">
          <Text className="text-sm text-gray-600">{`Progress: 53.6%`}</Text>
          <Text className="text-sm text-gray-600">{`Target: 6000000`}</Text>
        </Flex>
        <ProgressBar value={53.6} className="mt-2" />
      </Card>

      {/* Profit Card */}
      <Card className="p-4 border bg-gray-900 dark border-gray-200 rounded-lg shadow-md">
        <Flex alignItems="start">
          <div className="truncate">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Total Profit
            </Text>
            <Metric className="text-2xl text-cyan-600">{`¥${totalProfit}`}</Metric>
          </div>
        </Flex>
        <Flex className="mt-4 space-x-2">
          <Text className="text-sm text-gray-600">{`Progress: 36.5%`}</Text>
          <Text className="text-sm text-gray-600">{`Target: ¥4000000000`}</Text>
        </Flex>
        <ProgressBar value={36.5} className="mt-2" />
      </Card>
    </Grid>
  );
};

export default KpiCardGrid;
