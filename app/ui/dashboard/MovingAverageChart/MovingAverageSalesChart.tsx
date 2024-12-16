// "use client";

// import React, { useMemo, useState } from "react";
// import { AreaChart, Card, Title, Select, SelectItem } from "@tremor/react";

// // Define the component props
// type MovingSalesAverageProps = {
//   data: {
//     sales_month: string;
//     supplier_name: string;
//     annual_sales_total: number;
//   }[];
// };

// export default function MovingSalesAverageComponent({
//   data,
// }: MovingSalesAverageProps) {
//   const [selectedTimeline, setSelectedTimeline] = useState("6_months");

//   // Filter and process data based on the selected timeline
//   const { chartData, suppliers } = useMemo(() => {
//     const currentDate = new Date();
//     currentDate.setDate(1);
//     currentDate.setMonth(currentDate.getMonth()-1);

//     let monthsToSubtract = 6; // Default to 6 months

//     if (selectedTimeline === "12_months") {
//       monthsToSubtract = 12;
//     } else if (selectedTimeline === "36_months") {
//       monthsToSubtract = 36;
//     }

//     // Calculate the start date based on the selected timeline
//     const startDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - (monthsToSubtract-1),
//       1
//     );

//     // Filter data based on the selected timeline
//     const filteredData = data.filter((row) => {
//       const rowDate = new Date(row.sales_month);
//       return rowDate >= startDate && rowDate < currentDate;
//     });

//     // Group data by sales_month
//     const groupedData: Record<string, any> = {};
//     filteredData.forEach((row) => {
//       const month = row.sales_month;

//       if (!groupedData[month]) {
//         groupedData[month] = { sales_month: month };
//       }

//       // Add the annual_sales_total for each supplier dynamically
//       groupedData[month][row.supplier_name] = row.annual_sales_total;
//     });

//     return {
//       chartData: Object.values(groupedData), // Convert grouped data to array for Tremor
//       suppliers: [...new Set(filteredData.map((row) => row.supplier_name))], // Unique supplier names
//     };
//   }, [data, selectedTimeline]);

//   return (
//     <Card className="w-full border border-blue-700">
//       <Title>Top 10 Suppliers - Annual Sales Total</Title>

//       {/* Timeline Selector */}
//       <div className="flex justify-end mb-4">
//         <Select
//           value={selectedTimeline}
//           onValueChange={setSelectedTimeline}
//           className="w-48"
//         >
//           <SelectItem value="6_months">Last 6 Months</SelectItem>
//           <SelectItem value="12_months">Last 12 Months</SelectItem>
//           <SelectItem value="36_months">Last 3 Years</SelectItem>
//         </Select>
//       </div>

//       {/* Area Chart */}
//       <AreaChart
//         className="h-[500px]"
//         data={chartData}
//         index="sales_month" // X-axis key
//         categories={suppliers} // Supplier names as categories
//         colors={[
//           "indigo",
//           "cyan",
//           "teal",
//           "rose",
//           "emerald",
//           "amber",
//           "violet",
//           "purple",
//           "blue",
//           "pink",
//         ]}
//         showLegend={true}
//         showAnimation={true}
//         yAxisWidth={100}
//         maxValue={10000000}
//       />
//     </Card>
//   );
// }


"use client";

import React, { useMemo, useState } from "react";
import { AreaChart, Card, Title, Select, SelectItem, MultiSelect, MultiSelectItem } from "@tremor/react";

type MovingSalesAverageProps = {
  data: {
    sales_month: string;
    supplier_name: string;
    annual_sales_total: string;
  }[];
};

export default function MovingSalesAverageComponent({
  data,
}: MovingSalesAverageProps) {
  const supplierSet = new Set<string>(data.map((row) => row.supplier_name));
  const supplierList = Array.from(supplierSet); // Full list of suppliers
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>(supplierList); // Initially select all suppliers
  const [selectedTimeline, setSelectedTimeline] = useState("6_months");

  const { chartData, maxValue } = useMemo(() => {
    const currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() - 1);

    let monthsToSubtract = 6;
    if (selectedTimeline === "12_months") monthsToSubtract = 12;
    if (selectedTimeline === "36_months") monthsToSubtract = 36;

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (monthsToSubtract - 1),
      1
    );

    // Generate a list of Month-Year
    const timeline: string[] = [];
    const tempDate = new Date(startDate);
    while (tempDate <= currentDate) {
      const monthYear = tempDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      timeline.push(monthYear);
      tempDate.setMonth(tempDate.getMonth() + 1);
    }

    // Initialize grouped data with all months and suppliers set to 0
    const groupedData: Record<string, any> = {};
    timeline.forEach((monthYear) => {
      groupedData[monthYear] = { sales_month: monthYear };
      supplierList.forEach((supplier) => {
        groupedData[monthYear][supplier] = 0;
      });
    });

    // Populate grouped data with actual values from input data
    data.forEach((row) => {
      const rowDate = new Date(row.sales_month);
      const monthYear = rowDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (groupedData[monthYear]) {
        groupedData[monthYear][row.supplier_name] =
          Number(row.annual_sales_total) || 0;
      }
    });

    // Filter suppliers in the final chartData based on `selectedSuppliers`
    const filteredGroupedData = Object.values(groupedData).map((monthData) => {
      const filteredMonthData = { sales_month: monthData.sales_month };
      selectedSuppliers.forEach((supplier) => {
        filteredMonthData[supplier] = monthData[supplier];
      });
      return filteredMonthData;
    });

    // Calculate the maximum value for the y-axis
    const calculatedMaxValue = Math.max(
      ...Object.values(groupedData).flatMap((monthData: any) =>
        selectedSuppliers.map((supplier) => monthData[supplier])
      )
    );

    return {
      chartData: filteredGroupedData, // Only include selected suppliers
      maxValue: Math.ceil(calculatedMaxValue * 1.1), // Add 10% margin for better display
    };
  }, [data, selectedTimeline, selectedSuppliers]);

  return (
    <Card className="w-full border-2 border-slate-800">
      <Title>Top 10 Suppliers - Annual Sales Total</Title>

      {/* Controls */}
      <div className="flex justify-between m-4">
        {/* Supplier Dropdown */}
        <MultiSelect
          className="w-1/2"
          value={selectedSuppliers}
          onValueChange={setSelectedSuppliers}
          placeholder="Select Suppliers"
        >
          {supplierList.map((supplier) => (
            <MultiSelectItem key={supplier} value={supplier} className={`${selectedSuppliers.includes(supplier) ? 'bg-slate-400 border-2 border-white text-slate-100': ''}`}>
              {supplier}
            </MultiSelectItem>
          ))}
        </MultiSelect>

        {/* Timeline Selector */}
        <Select
          value={selectedTimeline}
          onValueChange={setSelectedTimeline}
          className="w-48"
        >
          <SelectItem value="6_months">Last 6 Months</SelectItem>
          <SelectItem value="12_months">Last 12 Months</SelectItem>
          <SelectItem value="36_months">Last 3 Years</SelectItem>
        </Select>
      </div>

      {/* Area Chart */}
      <AreaChart
        className="h-[500px]"
        data={chartData}
        index="sales_month"
        categories={selectedSuppliers} // Dynamically filter suppliers
        showLegend={true}
        showAnimation={true}
        yAxisWidth={100}
        colors={[
          "indigo",
          "cyan",
          "teal",
          "rose",
          "emerald",
          "amber",
          "violet",
          "purple",
          "blue",
          "pink",
        ]}
        maxValue={maxValue} // Dynamically set max value
      />
    </Card>
  );
}

