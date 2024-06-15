import { BarChart, Card, Title } from "@tremor/react";
      
const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function ComparisionBarChart(props:any){
 const {data}=props;
 return(
  <Card>
    <Title>Comparision of Sales Stock, Sales Quantity & Delivery Quantity</Title>
    <BarChart
      className="mt-6"
      data={props.data}
      index="Date"
      maxValue={300000}
      categories={["SalesStock", "SalesQuantity", "DeliveryQuantity"]}
      colors={["teal", "amber", "emerald"]}
      yAxisWidth={100}
    />
  </Card>
)};