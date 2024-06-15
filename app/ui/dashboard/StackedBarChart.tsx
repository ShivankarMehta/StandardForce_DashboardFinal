import { Card, Title, BarChart, Text } from "@tremor/react";

const valueFormatter = (number) => Intl.NumberFormat("us").format(number).toString();

export default function StackedBarChart(props:any) {
  return (
    <Card>
      <Title>Monthly Sales Target</Title>
      <BarChart
        className="mt-4 h-80"
        data={props.data}
        index="month"
        categories={["staff_6","staff_9","staff_14","staff_15","staff_25","staff_35","staff_40","staff_53","staff_55","total_sales_target"]}
        colors={["sky", "violet", "fuchsia","blue", "teal", "amber", "rose", "indigo", "emerald","neutral"]}
        stack={true}
        yAxisWidth={100}
      />
    </Card>
  );
}