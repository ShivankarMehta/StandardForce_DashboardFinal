'use client';

import React, { useState, useEffect } from "react";
import { FilterProvider, useFilterContext } from "@/app/Context/FilterContext";
import GlobalFilter from "@/app/ui/dashboard/GlobalFilter/Filter";
import ExampleCard from "@/app/ui/dashboard/Other/ExampleCard";
import { salesTotal } from "../../lib/data";

const DashboardClientWrapper: React.FC<{
  initialFilterData: any;
  initialSalesData: any;
}> = ({ initialFilterData, initialSalesData }) => {
  return (
    <FilterProvider>
      <DashboardContent
        initialFilterData={initialFilterData}
        initialSalesData={initialSalesData}
      />
    </FilterProvider>
  );
};

const DashboardContent: React.FC<{
  initialFilterData: any;
  initialSalesData: any;
}> = ({ initialFilterData, initialSalesData }) => {
  const { filters } = useFilterContext();

  // State for sales data, converted to numbers
  const [salesData, setSalesData] = useState(() =>
    initialSalesData.map((item: any) => ({
      Sales: Number(item.Sales),
      Quantity: Number(item.Quantity),
      Profit: Number(item.Profit),
    }))
  );

  // Fetch new sales data when filters change
  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const data = await salesTotal(filters);
        const numericData = data.map((item: any) => ({
          Sales: Number(item.Sales),
          Quantity: Number(item.Quantity),
          Profit: Number(item.Profit),
        }));
        setSalesData(numericData);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };
    fetchFilteredData();
  }, [filters]);

  return (
    <div className="flex flex-col p-6 gap-2">
      {/* Global Filter Component */}
      <GlobalFilter data={initialFilterData} />

      {/* ExampleCard Updates Dynamically */}
      <ExampleCard
        totalSales={salesData?.[0]?.Sales || 0}
        totalQuantity={salesData?.[0]?.Quantity || 0}
        totalProfit={salesData?.[0]?.Profit || 0}
      />
    </div>
  );
};

export default DashboardClientWrapper;
