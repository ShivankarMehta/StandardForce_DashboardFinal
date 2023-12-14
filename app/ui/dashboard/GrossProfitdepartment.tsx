import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { Metric, Subtitle, Bold, Italic, Text } from "@tremor/react";

const valueFormatter = (number) =>
   `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function GrossProfitDepartment(props: any) {
   return (
      <Card >
         <Title>Gross Profit By Departments</Title>
         <Subtitle>
            This chart shows Gross Profit against Department Name.
         </Subtitle>
         <BarChart
            className="mt-6 h-96"
            data={props.data}
            showAnimation={true}
            index="Department"
            maxValue={14}
            yAxisWidth={100}
            categories={["GrossProfitRate", "Department"]}
            colors={["blue"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
