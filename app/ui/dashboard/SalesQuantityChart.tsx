// "use server";
import { SalesTotalOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";
const valueFormatter = async function (number: number) {
   return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default async function SalesQuantityChartComponent(props: any) {
   const { data } = props;
   // console.log("Inside the component", data);
   return (
      <Card >
         <Title>Sales Quantity Over Time</Title>
         <AreaChart
            className="h-96 mt-4"
            showAnimation={true}
            data={data}
            autoMinValue={true}
            maxValue={7500}
            yAxisWidth={100}
            index="sales_date"
            categories={["Date", "TotalQuantity"]}
            colors={["indigo", "cyan"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
