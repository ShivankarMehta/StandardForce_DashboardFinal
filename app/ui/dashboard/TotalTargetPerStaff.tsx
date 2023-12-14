import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { Metric, Subtitle, Bold, Italic, Text } from "@tremor/react";

const valueFormatter = (number) =>
   `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function Totaltargetperstaff(props: any) {
   return (
      <Card >
         <Title>Total Target vs StaffID</Title>
         <Subtitle>
         This chart shows Yearly Target Set by the Company per staff
         </Subtitle>
         <BarChart
            className="mt-6 h-96"
            data={props.data}
            showAnimation={true}
            index="StaffID"
            maxValue={1300000000}
            yAxisWidth={100}
            categories={["Totaltarget", "StaffID"]}
            colors={["emerald"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
