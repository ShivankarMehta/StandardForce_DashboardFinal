import { SalesTotalOverTime } from "@/app/lib/definitions";
import {
   fetchSalesQuantityOverTime,
   fetchSalesTotalOverTime,
   fetchTargetSalesTotalOverTime,
   fetchCostsTotalOverTime,
   fetchTargetTimeSeries,
   fetchTotalTargetPerStaff,
   fetchTargetPerStaffDounut,
   fetchDelieveryQuantityOverTime,
   fetchgrossProfitDepartment,
   fetchstackedbarchart,
   fetchscatterplotedata,
   fetchComparisionChartData,
   fetchCardDetails
   // fetchCumulativeData
} from "../../lib/data";
import AreaChartComponent from "../../ui/dashboard/SalesTotal";
import ExampleCard from "../../ui/dashboard/ExampleCard";
import BarChartComponent from "@/app/ui/dashboard/BarChart";
import SalesQuantityChartComponent from "@/app/ui/dashboard/SalesQuantityChart";
import CostTotal from "@/app/ui/dashboard/CostTotal";
import TimeSeriesTargetFunc from "@/app/ui/dashboard/TimeSeriesTarget";
import Totaltargetperstaff from "@/app/ui/dashboard/TotalTargetPerStaff";
import DonutCharttarget from "@/app/ui/dashboard/DounutTargetperstaff";
import DelieveryQuantityChartComponent from "@/app/ui/dashboard/DelieveryQuantityChart";
import GrossProfitDepartment from "@/app/ui/dashboard/GrossProfitdepartment";
import StackedBarChart from "@/app/ui/dashboard/StackedBarChart";
import ScatterChartPlot from "@/app/ui/dashboard/ScatterPlot";
import CumulativeSales from "@/app/ui/dashboard/CumulativeSalesQuantity";
import ComparisionBarChart from "@/app/ui/dashboard/ComparisionChartSales";
export default async function Home() {
   const salesOverTimeData: SalesTotalOverTime[] =
      await fetchSalesTotalOverTime();
   const salesTargetStaff: any = await fetchTargetSalesTotalOverTime();
   const SalesQuantityOverTime: any = await fetchSalesQuantityOverTime();
   const CostsTotalOverTimeData: any= await fetchCostsTotalOverTime();
   const timeSeriesTargetData: any= await fetchTargetTimeSeries();
   const totaltargetperstaffData: any= await fetchTotalTargetPerStaff();
   const donutCharttargetData: any = await fetchTargetPerStaffDounut();
   const delieveryQuantityOverTime:any= await fetchDelieveryQuantityOverTime();
   const grossprofitdepartmentData: any= await fetchgrossProfitDepartment();
   const  stackedbardata: any= await fetchstackedbarchart();
   const scatterplotdata:any= await fetchscatterplotedata();
   const comparisionbardata: any= await fetchComparisionChartData();
   const carddata:any=await fetchCardDetails();
   // const cumulativechartdata:any=await fetchCumulativeData();
   console.log(carddata[0].TotalSales);
   return (
      <div className="flex flex-col p-6 gap-2">
         <ExampleCard 
         totalSales={carddata[0].TotalSales}
         totalQuantity={carddata[0].TotalSalesQuantity}
         totalProfit={carddata[0].TotalProfit}
         />
         <div className="flex gap-2">
         <AreaChartComponent data={salesOverTimeData} />
         <CostTotal data={CostsTotalOverTimeData}/>
         </div>
         {/* <AreaChartComponent data={salesTargetStaff} /> */}
         <div className="flex gap-2">
         <Totaltargetperstaff data= {totaltargetperstaffData}/>
         <BarChartComponent data={salesTargetStaff} />
         </div>
         <TimeSeriesTargetFunc data={timeSeriesTargetData}/> 
         <div className="flex gap-2">
         <DelieveryQuantityChartComponent data={delieveryQuantityOverTime}/>
         <SalesQuantityChartComponent data={SalesQuantityOverTime} />
         </div>
         <GrossProfitDepartment data={grossprofitdepartmentData}/>
         <StackedBarChart data={stackedbardata} />
         <ComparisionBarChart data={comparisionbardata}/>
         {/* <CumulativeSales data={cumulativechartdata}/> */}
         {/* <ScatterChartPlot data={scatterplotdata} /> */}
         {/* <DonutCharttarget data={donutCharttargetData}/> */}
         {/* <LChart data={salesOverTimeData} /> */}
      </div>
   );
}
