import { AreaChart, Card, Title } from "@tremor/react";

const valueFormatter = function(number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function CumulativeSales(props:any){
const {data}=props;
return(
  <Card>
    <Title>Cumulative Sales Quantity Over Time</Title>
    <AreaChart
      className="h-72 mt-4"
      data={props.tdata}
      index="date"
      categories={["CumulativeSalesQuantity"]}
      colors={["indigo"]}
      valueFormatter={valueFormatter}
    />
  </Card>
)};