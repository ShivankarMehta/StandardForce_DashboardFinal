import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { Metric, Subtitle, Bold, Italic, Text } from "@tremor/react";

const valueFormatter = (number) =>
   `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function BarChartComponent(props: any) {
   return (
      <Card >
         <Title>Target Sales</Title>
         <Subtitle>
            This chart shows Target sales against particular staff member.
         </Subtitle>
         <BarChart
            className="mt-6 h-96"
            data={props.data}
            showAnimation={true}
            index="staff_name"
            maxValue={1300000000}
            yAxisWidth={100}
            categories={["Target_Sales", "staff_name"]}
            colors={["blue"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
