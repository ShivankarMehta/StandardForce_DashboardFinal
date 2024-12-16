import { globalfilter, salesTotal, targetValue, fetchMovingSalesTotalOverTime } from "../../lib/data";
import DashboardClientWrapper from "./DashboardClientWrapper";
import { Card } from "@/components/ui/card";
import MovingSalesAverageComponent from "@/app/ui/dashboard/MovingAverageChart/MovingAverageSalesChart";
export default async function Home() {
  const movingAverageSalesData: any = await fetchMovingSalesTotalOverTime();
  const filterData = await globalfilter();
// Get the current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS

// Fetch the initial sales data based on default filters
const initialFilters = {
  year: currentYear, // Current Year
  department: filterData.departments || [], // All departments
  staff: filterData.staff || [], // All staff
  monthRange: [currentMonth, currentMonth], // Current month
};

const initialSalesData = await salesTotal(initialFilters);
const initialTargetData = await targetValue(initialFilters);

  return (
    <div>
      <DashboardClientWrapper
        initialFilterData={filterData}
        initialSalesData={initialSalesData}
        initialTargetData={initialTargetData}
      />
      <Card className="m-6 mt-1">
      <MovingSalesAverageComponent data={movingAverageSalesData}/>
      </Card>
    </div>
  );
}
