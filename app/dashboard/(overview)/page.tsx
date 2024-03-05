import { SalesTotalOverTime } from "@/app/lib/definitions";
import {
  fetchSalesQuantityOverTime,
  fetchSalesTotalOverTime,
  fetchTargetSalesTotalOverTime,
  fetchTargetPerStaffDounut,
  fetchDelieveryQuantityOverTime,
  fetchgrossProfitDepartment,
  fetchstackedbarchart,
  fetchscatterplotedata,
  fetchComparisionChartData,
  fetchCardDetails,
  fetchMixedPlot,
  fetchMonthlySalesComparison,
  fetchMapData,
  // fetchCumulativeData
} from "../../lib/data";
import AreaChartComponent from "../../ui/dashboard/SalesTotal";
import ExampleCard from "../../ui/dashboard/ExampleCard";
import BarChartComponent from "@/app/ui/dashboard/BarChart";
import SalesQuantityChartComponent from "@/app/ui/dashboard/SalesQuantityChart";
import DonutCharttarget from "@/app/ui/dashboard/DounutTargetperstaff";
import DelieveryQuantityChartComponent from "@/app/ui/dashboard/DelieveryQuantityChart";
import GrossProfitDepartment from "@/app/ui/dashboard/GrossProfitdepartment";
import StackedBarChart from "@/app/ui/dashboard/StackedBarChart";
import ScatterChartPlot from "@/app/ui/dashboard/ScatterPlot";
import CumulativeSales from "@/app/ui/dashboard/CumulativeSalesQuantity";
import ComparisionBarChart from "@/app/ui/dashboard/ComparisionChartSales";
import MainChartComponent from "@/app/ui/dashboard/Mainchart";
import Logout from "@/app/components/logout";
import MapComponent from "@/app/ui/dashboard/MapComponents/Map";
import SalesComparison from "@/app/ui/dashboard/SalesComparison";
// import Choropleth from "@/app/ui/dashboard/Choropleth";
export default async function Home() {
  const salesOverTimeData: SalesTotalOverTime[] =
    await fetchSalesTotalOverTime();
  const salesTargetStaff: any = await fetchTargetSalesTotalOverTime();
  const SalesQuantityOverTime: any = await fetchSalesQuantityOverTime();
  const donutCharttargetData: any = await fetchTargetPerStaffDounut();
  const delieveryQuantityOverTime: any = await fetchDelieveryQuantityOverTime();
  const grossprofitdepartmentData: any = await fetchgrossProfitDepartment();
  const stackedbardata: any = await fetchstackedbarchart();
  const scatterplotdata: any = await fetchscatterplotedata();
  const comparisionbardata: any = await fetchComparisionChartData();
  const carddata: any = await fetchCardDetails();
  const mainchartdata: any = await fetchMixedPlot();
  const MapData: any = await fetchMapData();
  const monthlysalesdata: any = await fetchMonthlySalesComparison();
  // const cumulativechartdata:any=await fetchCumulativeData();
  // console.log(grossprofitdepartmentData);
  return (
    <div className="flex flex-col p-4 gap-4">
      <Logout />
      <ExampleCard
        totalSales={carddata[0].TotalSales}
        totalQuantity={carddata[0].TotalSalesQuantity}
        totalProfit={carddata[0].TotalProfit}
      />
      <AreaChartComponent data={salesOverTimeData} />
      {/* <AreaChartComponent data={salesTargetStaff} /> */}
      {/* <BarChartComponent data={salesTargetStaff} /> */}
      <DelieveryQuantityChartComponent data={delieveryQuantityOverTime} />
      <SalesQuantityChartComponent data={SalesQuantityOverTime} />
      <GrossProfitDepartment data={grossprofitdepartmentData} />
      {/* <StackedBarChart data={stackedbardata} /> */}
      <ComparisionBarChart data={comparisionbardata} />
      {/* <CumulativeSales data={cumulativechartdata}/> */}
      {/* <ScatterChartPlot data={scatterplotdata} /> */}
      {/* <DonutCharttarget data={donutCharttargetData}/> */}
      {/* <LChart data={salesOverTimeData} /> */}
      <MainChartComponent data={mainchartdata} />
      {/* <Choropleth dashboard={false} /> */}
      <SalesComparison data={monthlysalesdata} />
      <MapComponent data={MapData} token={process.env.MAP_BOX_TOKEN} />
    </div>
  );
}
