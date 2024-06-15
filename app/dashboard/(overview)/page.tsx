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
   fetchSalesCustomers,
   fetchSalesMatter,
   fetchSalesConstructions,
   fetchfunnelmatter
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
import Choropleth from "@/app/ui/dashboard/Choropleth";
import CustomerSalesComponent from "@/app/ui/dashboard/CustomerSales";
import MatterSalesComponent from "@/app/ui/dashboard/MatterSales";
import ConstructionSalesComponent from "@/app/ui/dashboard/ConstructionSales";
import FunnelChartHero from "@/app/ui/dashboard/FunnelChartMatter";
import SalesTableComponent from "@/app/ui/dashboard/Tables/SalesTable";
import DelieveryTableComponent from "@/app/ui/dashboard/Tables/DelieveryQuantityTable";
import SalesQuantityTableComponent from "@/app/ui/dashboard/Tables/SalesQuantityTable";
import ComparisionTableComponent from "@/app/ui/dashboard/Tables/ComparisionTable";
import MainSalesTableComponent from "@/app/ui/dashboard/Tables/MainTable";
import CustomersTableComponent from "@/app/ui/dashboard/Tables/CustomersTable";
import MattersTableComponent from "@/app/ui/dashboard/Tables/MattersTable";
import ConstructionTableComponent from "@/app/ui/dashboard/Tables/ConstructionTable";
export default async function Home() {
   const salesOverTimeData: any =
      await fetchSalesTotalOverTime();
   const salesTargetStaff: any = await fetchTargetSalesTotalOverTime();
   const SalesQuantityOverTime: any = await fetchSalesQuantityOverTime();
   const donutCharttargetData: any = await fetchTargetPerStaffDounut();
   const delieveryQuantityOverTime:any= await fetchDelieveryQuantityOverTime();
   const grossprofitdepartmentData: any= await fetchgrossProfitDepartment();
   const  stackedbardata: any= await fetchstackedbarchart();
   const scatterplotdata:any= await fetchscatterplotedata();
   const comparisionbardata: any= await fetchComparisionChartData();
   const carddata:any=await fetchCardDetails();
   const mainchartdata:any=await fetchMixedPlot();
   const customersalesdata: any=await fetchSalesCustomers();
   const mattersalesdata:any=await fetchSalesMatter();
   const constructionsalesdata:any=await fetchSalesConstructions();
   const funnelmatterdata:any=await fetchfunnelmatter();
   // const cumulativechartdata:any=await fetchCumulativeData();
   return (
      <div className="flex flex-col p-6 gap-2">
         <Logout />
         <ExampleCard 
         totalSales={carddata[0].TotalSales}
         totalQuantity={carddata[0].TotalSalesQuantity}
         totalProfit={carddata[0].TotalProfit}
         />
         <AreaChartComponent data={salesOverTimeData} />
         <SalesTableComponent data={salesOverTimeData}/>
         {/* <AreaChartComponent data={salesTargetStaff} /> */}
         {/* <BarChartComponent data={salesTargetStaff} /> */}
         <DelieveryQuantityChartComponent data={delieveryQuantityOverTime}/>
         <DelieveryTableComponent data={delieveryQuantityOverTime}/>
         <SalesQuantityChartComponent data={SalesQuantityOverTime} />
         <SalesQuantityTableComponent data={SalesQuantityOverTime}/>
         <GrossProfitDepartment data={grossprofitdepartmentData}/>
         {/* <StackedBarChart data={stackedbardata} /> */}
         <ComparisionBarChart data={comparisionbardata}/>
         <ComparisionTableComponent data={comparisionbardata}/>
         {/* <CumulativeSales data={cumulativechartdata}/> */}
         {/* <ScatterChartPlot data={scatterplotdata} /> */}
         {/* <DonutCharttarget data={donutCharttargetData}/> */}
         {/* <LChart data={salesOverTimeData} /> */}
         <MainChartComponent data={mainchartdata}/>
         <MainSalesTableComponent data={mainchartdata}/>
         <Choropleth dashboard={false} />
         <CustomerSalesComponent data={customersalesdata}/>
         <CustomersTableComponent data={customersalesdata}/>
         <MatterSalesComponent data={mattersalesdata}/>
         <MattersTableComponent data={mattersalesdata}/>
         <ConstructionSalesComponent data={constructionsalesdata}/>
         <ConstructionTableComponent data={constructionsalesdata}/>
         <FunnelChartHero data={funnelmatterdata[0]}/>
      </div>
   );
}
