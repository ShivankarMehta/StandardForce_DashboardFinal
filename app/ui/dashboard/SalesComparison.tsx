// Ensure this script runs in a client environment due to the use of hooks
"use client";

// Import necessary components and hooks from React and @tremor/react
import { useEffect, useState } from "react";
import { BarChart, Card, Title } from "@tremor/react";

// Function to format numerical values as currency
const valueFormatter = (number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

// The SalesComparison component
const SalesComparison = ({ data }) => {
  // State to hold transformed data suitable for the bar chart
  const [transformedData, setTransformedData] = useState([]);

  // Effect hook to transform incoming data into a format suitable for the bar chart
  useEffect(() => {
    // Initialize an object to hold data for each month
    const tempData: any = Array.from({ length: 12 }).reduce(
      (acc: any, _, index) => {
        const monthName = new Date(0, index).toLocaleString("default", {
          month: "long",
        });
        acc[monthName] = { Date: monthName }; // Initialize each month with its name
        return acc;
      },
      {}
    );

    // Iterate over the incoming data to populate tempData with sales data for each month and year
    data.forEach(({ Year, Month, Total_Sales }) => {
      const monthName = new Date(0, Month - 1).toLocaleString("default", {
        month: "long",
      });
      tempData[monthName][`Sales_${Year}`] = Total_Sales; // Assign sales data to the corresponding month and year
    });

    // Convert tempData to an array format suitable for the BarChart component
    const chartData: any = Object.values(tempData);
    setTransformedData(chartData); // Update state with the transformed data
  }, [data]); // Re-run the effect if the data prop changes

  return (
    <Card>
      <Title>Sales Per Month</Title>
      <BarChart
        style={{ height: "500px" }}
        className="mt-6"
        data={transformedData}
        index="Date"
        maxValue={300000000} // Set maximum value for the Y-axis
        categories={["Sales_2022", "Sales_2023", "Sales_2024"]} // Set categories for the bar chart
        colors={["teal", "amber", "emerald"]} // Set colors for each category
        yAxisWidth={100} // Set width of the Y-axis
      />
    </Card>
  );
};

// Export the SalesComparison component for use in other parts of your application
export default SalesComparison;
