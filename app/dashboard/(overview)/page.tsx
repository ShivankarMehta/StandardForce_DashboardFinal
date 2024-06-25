import { Card } from "@tremor/react";
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
   fetchfunnelmatter,
   fetchstaffdetails,
   fetchdepartmentdetails
   // fetchCumulativeData
} from "../../lib/data";
import Header from "@/app/ui/dashboard/HeaderComponent";
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
import StaffSalesComponent from "@/app/ui/dashboard/SalesStaffArea";
import StaffTableComponent from "@/app/ui/dashboard/Tables/StaffProfitTable";
import StaffSalesComponentBar from "@/app/ui/dashboard/Barcharts/Staffprofitbar";
import ConstructionSalesComponentBar from "@/app/ui/dashboard/Barcharts/Constructionprofitbar";
import MatterSalesComponentBar from "@/app/ui/dashboard/Barcharts/MatterProfitBar";
import CustomerSalesComponentBar from "@/app/ui/dashboard/Barcharts/CustomerProfitBar";
import CustomerSalesComponentPie from "@/app/ui/dashboard/Piecharts/CustomerProfitPie";
import ConstructionSalesComponentPie from "@/app/ui/dashboard/Piecharts/ConstructionProfitPie";
import MatterSalesComponentPie from "@/app/ui/dashboard/Piecharts/MatterProfitBar";
import StaffSalesComponentPie from "@/app/ui/dashboard/Piecharts/StaffProfitPie";
import DepartmentSalesComponent from "@/app/ui/dashboard/DepartmentSalesProfit";
import DepartmentSalesComponentBar from "@/app/ui/dashboard/Barcharts/DepartmentprofitBar";
import DepartmentSalesComponentPie from "@/app/ui/dashboard/Piecharts/DepartmentProfitPie";
import DepartmentTableComponent from "@/app/ui/dashboard/Tables/DepartmentTable";
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
   const staffsalesdata:any=await fetchstaffdetails();
   const departmentsalesdata:any=await fetchdepartmentdetails();
   // const cumulativechartdata:any=await fetchCumulativeData();
   return (
      <div className="flex flex-col p-6 gap-2">
         <Card className="space-y-4 bg-gray-400">
         <Logout />
         <ExampleCard 
         totalSales={carddata[0].TotalSales}
         totalQuantity={carddata[0].TotalSalesQuantity}
         totalProfit={carddata[0].TotalProfit}
         />
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Sales & Profit analysis"/>
         <MainChartComponent data={mainchartdata}/>
         <MainSalesTableComponent data={mainchartdata}/>
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Sales Over Time"/>
         <AreaChartComponent data={salesOverTimeData} />
         <SalesTableComponent data={salesOverTimeData}/>
         </Card>
         {/* <AreaChartComponent data={salesTargetStaff} /> */}
         {/* <BarChartComponent data={salesTargetStaff} /> */}
         <Card className="space-y-4 bg-gray-400">
         <Header title="Delivery Quantity Over Time"/>
         <DelieveryQuantityChartComponent data={delieveryQuantityOverTime}/>
         <DelieveryTableComponent data={delieveryQuantityOverTime}/>
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Sales Quantity Over Time"/>
         <SalesQuantityChartComponent data={SalesQuantityOverTime} />
         <SalesQuantityTableComponent data={SalesQuantityOverTime}/>
         </Card>
         {/* <GrossProfitDepartment data={grossprofitdepartmentData}/> */}
         {/* <StackedBarChart data={stackedbardata} /> */}
         <Card className="space-y-4 bg-gray-400">
         <Header title="Comparision of Sales Stock, Sales Quantity and Delivery Quantity"/>
         <ComparisionBarChart data={comparisionbardata}/>
         <ComparisionTableComponent data={comparisionbardata}/>
         </Card>
         {/* <CumulativeSales data={cumulativechartdata}/> */}
         {/* <ScatterChartPlot data={scatterplotdata} /> */}
         {/* <DonutCharttarget data={donutCharttargetData}/> */}
         {/* <LChart data={salesOverTimeData} /> */}
         <Card className="space-y-4 bg-gray-400">
         <Choropleth dashboard={false} />
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Department vs Total Profit"/>
         <DepartmentSalesComponent data={departmentsalesdata}/>
         <DepartmentSalesComponentBar data={departmentsalesdata} />
         <DepartmentSalesComponentPie data={departmentsalesdata} />
         <DepartmentTableComponent data={departmentsalesdata}/>
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Customer vs Total Profit"/>
         <CustomerSalesComponent data={customersalesdata}/>
         <CustomerSalesComponentBar data={customersalesdata}/>
         <CustomerSalesComponentPie data={customersalesdata} />
         <CustomersTableComponent data={customersalesdata}/>
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Matter vs Total Profit"/>
         <MatterSalesComponent data={mattersalesdata}/>
         <MatterSalesComponentBar data={mattersalesdata}/>
         <MatterSalesComponentPie data={mattersalesdata}/>
         <MattersTableComponent data={mattersalesdata}/>
         </Card>
         <Card className="space-y-4 bg-gray-400">
         <Header title="Construction Sites vs Total Profit"/>
         <ConstructionSalesComponent data={constructionsalesdata}/>
         <ConstructionSalesComponentBar data={constructionsalesdata}/>
         <ConstructionSalesComponentPie data={constructionsalesdata} />
         <ConstructionTableComponent data={constructionsalesdata}/>
         </Card>
         {/* <FunnelChartHero data={funnelmatterdata[0]}/> */}
         <Card className="space-y-4 bg-gray-400">
         <Header title="Staff vs Total Profit"/>
         <StaffSalesComponent data={staffsalesdata} />
         <StaffSalesComponentBar data={staffsalesdata}/>
         <StaffSalesComponentPie data={staffsalesdata}/>
         <StaffTableComponent data={staffsalesdata}/>
         </Card>
      </div>
   );
}
