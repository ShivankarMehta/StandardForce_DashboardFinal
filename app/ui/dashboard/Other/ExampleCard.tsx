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
'use client'
import React, {useState} from "react";
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  BadgeDelta,
  DeltaType,
  Flex,
  Grid,
  Metric,
  ProgressBar,
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

 const [targets, setTargets]= useState({
  sales:1000000,
  quantity:1000,
  profit:50000, })

 const [isEditing, setIsEditing]= useState({
  sales:false,
  quantity:false,
  profit:false
 })

 const handleSave=(key: string, value:number) =>{
  setTargets({...targets,[key]:value});
  setIsEditing({...isEditing,[key]:false});
 }

 const handleEdit = (key:string) =>{
  setIsEditing({...isEditing, [key]:true});
 };


  return (
    <div className="flex flex-wrap gap-6 items-stretch justify-center p-6">
    {/* Total Sales Card */}
    <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
          Total Sales
        </CardTitle>
        <CardDescription className="text-xl md:text-3xl font-bold text-blue-600">{`¥${totalSales}`}</CardDescription>
      </CardHeader>
      <CardContent>
      <div className="flex justify-between">
            <p className="text-xs text-gray-600">{`Progress: 43%`}</p>
            <div className="w-[70%]">
              <p className="text-xs mb-2">{isEditing.sales? "Enter Target Amount:": "Target Amount"}</p>
              {isEditing.sales ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    defaultValue={targets.sales}
                    onChange={(e) => setTargets({ ...targets, sales: Number(e.target.value) })}
                    className="w-Full"
                  />
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => handleSave("sales", targets.sales)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p>{`¥${targets.sales}`}</p>
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => handleEdit("sales")}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          <ProgressBar value={43} className="mt-4" />
      </CardContent>
    </Card>
  
    {/* Total Profit Card */}
    <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
          Total Profit
        </CardTitle>
        <CardDescription className="text-xl md:text-3xl font-bold text-green-600">{`¥${totalProfit}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-xs text-gray-600">{`Progress: 33%`}</p>
          <div className="w-[70%]">
          <p className="text-xs mb-2">{isEditing.profit? "Enter Target Profit:": "Target Profit"}</p>
          {isEditing.profit ? (
            <div className="flex items-center gap-2">
            <Input
            type="number"
            defaultValue={targets.profit}
            onChange={(e)=> setTargets({...targets, profit:Number(e.target.value)})}
            className="w-Full"
            />
            <button
            className="text-sm text-blue-600 hover:underline"
            onClick={()=>handleSave("profit", targets.profit)}>
              Save
            </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{`¥${targets.profit}`}</p>
              <button className="text-sm text-blue-600 hover:underline"
              onClick={()=>handleEdit("profit")}
              >
                Edit
              </button>
            </div>
          )}
          </div>
        </div>
        <ProgressBar value={43} className="mt-4" />
      </CardContent>
    </Card>
  
    {/* Total Quantity Card */}
    <Card className="min-w-[250px] md:min-w-[450px] max-w-[500px] border border-gray-200 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm md:text-lg font-semibold text-gray-900 truncate">
          Total Quantity
        </CardTitle>
        <CardDescription className="text-xl md:text-3xl font-bold text-cyan-600">{`¥${totalQuantity}`}</CardDescription>
      </CardHeader>
      <CardContent >
      <div className="flex justify-between">
          <p className="text-xs text-gray-600">{`Progress: 33%`}</p>
          <div className="w-[70%]">
          <p className="text-xs mb-2">{isEditing.quantity? "Enter Target Quantity:": "Target Quantity"}</p>
          {isEditing.quantity ? (
            <div className="flex items-center gap-2">
            <Input
            type="number"
            defaultValue={targets.quantity}
            onChange={(e)=> setTargets({...targets, quantity:Number(e.target.value)})}
            className="w-Full"
            />
            <button
            className="text-sm text-blue-600 hover:underline"
            onClick={()=>handleSave("quantity", targets.quantity)}>
              Save
            </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{`${targets.quantity}`}</p>
              <button className="text-sm text-blue-600 hover:underline"
              onClick={()=>handleEdit("quantity")}
              >
                Edit
              </button>
            </div>
          )}
          </div>
        </div>
        <ProgressBar value={43} className="mt-4" />
      </CardContent>
    </Card>
  </div>  
  );
};

export default KpiCardGrid;
