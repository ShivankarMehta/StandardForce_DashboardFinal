// "use server";
import { AreaChart, Card, Title } from "@tremor/react";

const valueFormatter = async function (number: number) {
   return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default async function CostTotal(props: any) {
   const { data } = props;
   // console.log("Inside the component", data);
   const keys = Object.keys(data[0]);
   console.log(keys);
   return (
      <Card>
         <Title>Costs Over Time</Title>
         <AreaChart
            className="h-96 mt-4"
            showAnimation={true}
            data={data}
            maxValue={320000000}
            yAxisWidth={100}
            index={keys[0]}
            categories={[keys[1]]}
            colors={["cyan", "indigo"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
