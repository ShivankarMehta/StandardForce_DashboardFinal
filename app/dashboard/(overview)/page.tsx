import { globalfilter, salesTotal } from "../../lib/data";
import DashboardClientWrapper from "./DashboardClientWrapper";

export default async function Home() {
  const filterData = await globalfilter();
  console.log(filterData);

  // Fetch the initial sales data based on default filters
  const initialFilters = {
    year: filterData.defaultYear,
    department: filterData.defaultDepartment || [],
    staff: filterData.defaultStaff || [],
    monthRange: filterData.defaultMonthRange || [1, 12],
  };
  const initialSalesData = await salesTotal(initialFilters);
  console.log(initialSalesData);

  return (
    <div>
      <DashboardClientWrapper
        initialFilterData={filterData}
        initialSalesData={initialSalesData}
      />
    </div>
  );
}
