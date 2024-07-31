//"use server"
import { Card, ScatterChart, Text, Title } from "@tremor/react";
import React from "react";

export default function ScatterChartPlot(props:any){
  const {data} =props;
  const convertDateToString = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return date;
  };

  const formattedData = data.map(item => {
    const convertedItem = {
      ...item,
      Date: convertDateToString(item.Date),
      Sales_Stock: item.Sales_Stock.toString(),
      Sales_Quantity: item.Sales_Quantity.toString(),
      Sales_Total: item.Sales_Total.toString(),
    };
    return convertedItem;
  });
  return (
    <Card>
    <Title>Efficiency of Sales Stock</Title>
    <Text>Comparing Sales Stock with Sales Quantity </Text>
    <ScatterChart
          className="h-80 mt-6 -ml-2"
          yAxisWidth={50}
          data={props.data}
          category="Date"
          x="Sales_Stock"
          y="Sales_Quantity"
          size="Sales_Total"
          showOpacity={true}
          minYValue={60}
          valueFormatter={formattedData}
      enableLegendSlider
    />
  </Card>
  );
};