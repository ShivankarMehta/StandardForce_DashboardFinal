// "use server";
import { SalesTotalOverTime } from "@/app/lib/definitions";
import { AreaChart, Card, Title } from "@tremor/react";

const valueFormatter = async function (number: number) {
   return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

type MyComponentProps = {
   data: SalesTotalOverTime[];
};

export default async function AreaChartComponent(props: MyComponentProps) {
   const { data } = props;
   // console.log("Inside the component", data);
   const keys = Object.keys(data[0]);
   console.log(keys);
   return (
      <Card>
         <Title>Sales Over Time</Title>
         <AreaChart
            className="h-96 mt-4"
            showAnimation={true}
            data={data}
            yAxisWidth={100}
            index={keys[0]}
            categories={[keys[1]]}
            colors={["indigo", "cyan"]}
            //   valueFormatter={valueFormatter}
         />
      </Card>
   );
}
