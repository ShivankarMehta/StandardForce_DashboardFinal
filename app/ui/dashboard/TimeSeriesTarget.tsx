// "use server";
import { Card, LineChart, Title, Subtitle } from "@tremor/react";

const valueFormatter = async function (number: number){`$ ${new Intl.NumberFormat("us").format(number).toString()}`};

export default function TimeSeriesTargetFunc(props: any){
    const {data} =props;
    return(
  <Card>
    <Title>Time Series of Target Prices</Title>
    <Subtitle>
    This chart shows Yearly Target Set by the Company 
    </Subtitle>
    <LineChart
      className="mt-6"
      data={props.data}
      index="Year"
      categories={["TotalTarget"]}
      colors={["emerald"]}
      yAxisWidth={100}
    />
  </Card>
  );
};