'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the component's prop types
type SalesTotalOverTime = {
  Date: string; // Match the key in your data
  Target: number; // Match the key in your data
};

type MyComponentProps = {
  data: SalesTotalOverTime[];
};

export default function TargetOverTimeComponent({ data }: MyComponentProps) {
  // Validate data keys
  const keys = Object.keys(data[0] || {});
  console.log("Keys:", keys); // Debugging keys

  // Chart configuration for Shadcn
  const chartConfig = {
    Target: {
      label: "Target=",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Target Over Time</CardTitle>
        <CardDescription>
          Sales performance over time with target benchmarks
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <AreaChart
            data={data}
            margin={{
              left: 30,
              right: 12,
              top:20,
              bottom:12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="Date" // Match the key in your data
              tickLine={true}
              axisLine={true}
              tickMargin={5}
              tickFormatter={(value) => value}
            />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="Target" // Match the key in your data
              type="linear"
              fill="#94A3B8" // Add a valid CSS variable or hardcoded color
              fillOpacity={0.6}
              stroke="var(--color-sales)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
