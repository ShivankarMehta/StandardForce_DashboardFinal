import { globalfilter, salesTotal } from "../../lib/data";
import DashboardClientWrapper from "./DashboardClientWrapper";

export default async function Home() {
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

  return (
    <div>
      <DashboardClientWrapper
        initialFilterData={filterData}
        initialSalesData={initialSalesData}
      />
    </div>
  );
}
