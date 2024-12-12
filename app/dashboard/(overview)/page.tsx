// import { Card } from "@tremor/react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from "@tremor/react";

import {
  salesTotal,
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
  fetchdepartmentdetails,
  fetchTargetSalesOverTime,
  fetchGroupedBarSales,
  fetchGroupedBarProfit,
  fetchdepartmentsalesdetails,
  fetchproductsalesdetails,
  fetchproductspersupplierdetails,
  fetchquoteperproductdetails,
  fetchquotepermakerdetails,
  fetchMapData,
  globalfilter,
  // fetchCumulativeData
} from "../../lib/data";
import GlobalFilter from "@/app/ui/dashboard/GlobalFilter/Filter";
import Header from "@/app/ui/dashboard/Other/HeaderComponent";
import AreaChartComponent from "../../ui/dashboard/Other/SalesTotal";
import ExampleCard from "../../ui/dashboard/Other/ExampleCard";
import BarChartComponent from "@/app/ui/dashboard/Other/BarChart";
import SalesQuantityChartComponent from "@/app/ui/dashboard/Other/SalesQuantityChart";
import DonutCharttarget from "@/app/ui/dashboard/Other/DounutTargetperstaff";
import DelieveryQuantityChartComponent from "@/app/ui/dashboard/Other/DelieveryQuantityChart";
import GrossProfitDepartment from "@/app/ui/dashboard/Other/GrossProfitdepartment";
import StackedBarChart from "@/app/ui/dashboard/Other/StackedBarChart";
import ScatterChartPlot from "@/app/ui/dashboard/Other/ScatterPlot";
import CumulativeSales from "@/app/ui/dashboard/Other/CumulativeSalesQuantity";
import ComparisionBarChart from "@/app/ui/dashboard/Other/ComparisionChartSales";
import MainChartComponent from "@/app/ui/dashboard/Other/Mainchart";
import Logout from "@/app/components/logout";

import CustomerSalesComponent from "@/app/ui/dashboard/Other/CustomerSales";
import MatterSalesComponent from "@/app/ui/dashboard/Other/MatterSales";
import ConstructionSalesComponent from "@/app/ui/dashboard/Other/ConstructionSales";
import FunnelChartHero from "@/app/ui/dashboard/Other/FunnelChartMatter";
import SalesTableComponent from "@/app/ui/dashboard/Tables/SalesTable";
import DelieveryTableComponent from "@/app/ui/dashboard/Tables/DelieveryQuantityTable";
import SalesQuantityTableComponent from "@/app/ui/dashboard/Tables/SalesQuantityTable";
import ComparisionTableComponent from "@/app/ui/dashboard/Tables/ComparisionTable";
import MainSalesTableComponent from "@/app/ui/dashboard/Tables/MainTable";
import CustomersTableComponent from "@/app/ui/dashboard/Tables/CustomersTable";
import MattersTableComponent from "@/app/ui/dashboard/Tables/MattersTable";
import ConstructionTableComponent from "@/app/ui/dashboard/Tables/ConstructionTable";
import StaffSalesComponent from "@/app/ui/dashboard/Other/SalesStaffArea";
import StaffTableComponent from "@/app/ui/dashboard/Tables/StaffProfitTable";
import StaffSalesComponentBar from "@/app/ui/dashboard/Barcharts/Staffprofitbar";
import ConstructionSalesComponentBar from "@/app/ui/dashboard/Barcharts/Constructionprofitbar";
import MatterSalesComponentBar from "@/app/ui/dashboard/Barcharts/MatterProfitBar";
import CustomerSalesComponentBar from "@/app/ui/dashboard/Barcharts/CustomerProfitBar";
import CustomerSalesComponentPie from "@/app/ui/dashboard/Piecharts/CustomerProfitPie";
import ConstructionSalesComponentPie from "@/app/ui/dashboard/Piecharts/ConstructionProfitPie";
import MatterSalesComponentPie from "@/app/ui/dashboard/Piecharts/MatterProfitBar";
import StaffSalesComponentPie from "@/app/ui/dashboard/Piecharts/StaffProfitPie";
import DepartmentSalesComponent from "@/app/ui/dashboard/Other/DepartmentSalesProfit";
import DepartmentSalesComponentBar from "@/app/ui/dashboard/Barcharts/DepartmentprofitBar";
import DepartmentSalesComponentPie from "@/app/ui/dashboard/Piecharts/DepartmentProfitPie";
import DepartmentTableComponent from "@/app/ui/dashboard/Tables/DepartmentTable";
import DepartmentSalesComponentLine from "@/app/ui/dashboard/Linecharts/DepartmentProfitLine";
import CustomerSalesComponentLine from "@/app/ui/dashboard/Linecharts/CustomerProfitLine";
import ConstructionSalesComponentLine from "@/app/ui/dashboard/Linecharts/ConstructionProfitLine";
import MatterSalesComponentLine from "@/app/ui/dashboard/Linecharts/MatterProfitLine";
import StaffSalesComponentLine from "@/app/ui/dashboard/Linecharts/StaffProfitLine";
import ConstructionSalesComponentRadial from "@/app/ui/dashboard/Radialbarcharts/ConstructionProfitRadial";
import ConstructionSalesComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/ConstructionProfitPolarArea";
import CustomerSalesComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/CustomerProfitPolarArea";
import MatterSalesComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/MatterProfitPolarArea";
import DepartmentSalesComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/DepartmentProfitPolarArea";
import StaffSalesComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/StaffProfitPolarArea";
import DepartmentSalesComponentBubble from "@/app/ui/dashboard/PolarAreaCharts/Departmentbubble";
import TargetOverTimeComponent from "@/app/ui/dashboard/Other/TargetSalesoverTime";
import GroupedBarSales  from "@/app/ui/dashboard/GroupedBar/GroupedbarSales";
import SalesPerYearTableComponent from "@/app/ui/dashboard/Tables/SalesPerYear";
import GroupedBarProfit from "@/app/ui/dashboard/GroupedBar/GroupedbarProfit";
import ProfitPerYearTableComponent from "@/app/ui/dashboard/Tables/ProfitPerYearTableComponent";
import SalesPerDepartment from "@/app/ui/dashboard/AreaCharts/SalesPerDepartment";
import SalesPerDepartmentLine from "@/app/ui/dashboard/Linecharts/SalesPerDepartment";
import SalesPerDepartmentBar from "@/app/ui/dashboard/Barcharts/SalesPerDepartment";
import SalesPerDepartmentPie from "@/app/ui/dashboard/Piecharts/SalesPerDepartment";
import SalesPerDepartmentPolar from "@/app/ui/dashboard/PolarAreaCharts/SalesPerDepartment";
import SalesPerDepartmentTable from "@/app/ui/dashboard/Tables/SalesPerDepartment";
import ProductProfitComponent from "@/app/ui/dashboard/Other/ProductProfit";
import ProductProfitTableComponent from "@/app/ui/dashboard/Tables/ProductProfitTable";
import ProductProfitComponentLine from "@/app/ui/dashboard/Linecharts/ProductProfit";
import ProductProfitComponentBar from "@/app/ui/dashboard/Barcharts/ProductProfit";
import ProductProfitComponentPie from "@/app/ui/dashboard/Piecharts/ProductProfit";
import ProductProfitComponentPolar from "@/app/ui/dashboard/PolarAreaCharts/ProductProfit";
import ProductsPerSupplierTableComponent from "@/app/ui/dashboard/Tables/ProductsPerSuppliersTable";
import ProductsPerSupplierComponentBar from "@/app/ui/dashboard/Barcharts/ProductsPerSupplier";
import ProductsPerSupplierComponentPie from "@/app/ui/dashboard/Piecharts/ProductPerSupplier";
import QuoteQuantityPerProductComponentBar from "@/app/ui/dashboard/BarLists/QuoteQuantityPerProduct";
import QuoteQuantityProductTableComponent from "@/app/ui/dashboard/Tables/QuoteQuantityProductTable";
import QuoteQuantityPerMakerComponentBar from "@/app/ui/dashboard/BarLists/QuoteQuantityPerMaker";
import QuoteQuantityMakerTableComponent from "@/app/ui/dashboard/Tables/QuoteQuantityPerMakerTable";
import ProductsPerMakersComponentBar from "@/app/ui/dashboard/Barcharts/QuoteQuantityPerMaker";
import ProductsPerMakerComponentPie from "@/app/ui/dashboard/Piecharts/QuoteQuantityPerMaker";
import QuotePerProductComponentBar from "@/app/ui/dashboard/Barcharts/QuoteQuantityPerProduct";
import QuotePerProductComponentPie from "@/app/ui/dashboard/Piecharts/QuotePerProduct";
import QuoteQuantityPerSupplierComponentBar from "@/app/ui/dashboard/BarLists/QuoteQuantityPerSupplier";
import MapComponent from "@/app/ui/dashboard/MapComponents/Map";

export default async function Home() {
  const totalSales:any= await salesTotal();
  const salesOverTimeData: any = await fetchSalesTotalOverTime();
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
  const customersalesdata: any = await fetchSalesCustomers();
  const mattersalesdata: any = await fetchSalesMatter();
  const constructionsalesdata: any = await fetchSalesConstructions();
  const funnelmatterdata: any = await fetchfunnelmatter();
  const staffsalesdata: any = await fetchstaffdetails();
  const departmentsalesdata: any = await fetchdepartmentdetails();
  const targetsalesdata: any = await fetchTargetSalesOverTime();
  const groupedbardatasales: any = await fetchGroupedBarSales();
  const groupedbardataprofit: any = await fetchGroupedBarProfit();
  const salesperdepartmentdata: any = await fetchdepartmentsalesdetails();
  const salesperproduct: any = await fetchproductsalesdetails();
  const productpersupplier: any = await fetchproductspersupplierdetails();
  const quoteperproduct: any = await fetchquoteperproductdetails();
  const quotepermaker: any = await fetchquotepermakerdetails();
  const MapData: any = await fetchMapData();
  const filterData: any =await globalfilter();
  // console.log(filterData);
  // const cumulativechartdata:any=await fetchCumulativeData();
  // console.log(totalSales[0].Profit);
  return (
    <div className="flex flex-col p-6 gap-2">
      <GlobalFilter data={filterData}/>
      <Card className="space-y-4">
        <ExampleCard
          totalSales={totalSales[0].Sales.toLocaleString()}
          totalQuantity={totalSales[0].Quantity}
          totalProfit={totalSales[0].Profit}
        />
      </Card>
      <Card className="space-y-4 p-15">
      <TargetOverTimeComponent data={targetsalesdata}/>
      </Card>
      <Card className="space-y-4 border border-gray-300">
        <Header title="Sales Per Month analysis" />
        <GroupedBarSales data={groupedbardatasales} />
        <SalesPerYearTableComponent data={groupedbardatasales} />
      </Card>
      <Card className="space-y-4">
        <Header title="Profit Per Month analysis" />
        <GroupedBarProfit data={groupedbardataprofit} />
        <ProfitPerYearTableComponent data={groupedbardataprofit} />
      </Card>
      <Card className="space-y-4">
        <Header title="Sales & Profit analysis" />
        <MainChartComponent data={mainchartdata} />
        <MainSalesTableComponent data={mainchartdata} />
      </Card>
      <Card className="space-y-4 bg-slate-800">
        <Header title="Sales Over Time" />
        <AreaChartComponent data={salesOverTimeData} />
        <SalesTableComponent data={salesOverTimeData} />
      </Card>
      {/* <AreaChartComponent data={salesTargetStaff} /> */}
      {/* <BarChartComponent data={salesTargetStaff} /> */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Delivery Quantity Over Time" />
        <DelieveryQuantityChartComponent data={delieveryQuantityOverTime} />
        <DelieveryTableComponent data={delieveryQuantityOverTime} />
      </Card>
      <Card className="space-y-4 bg-slate-800">
        <Header title="Sales Quantity Over Time" />
        <SalesQuantityChartComponent data={SalesQuantityOverTime} />
        <SalesQuantityTableComponent data={SalesQuantityOverTime} />
      </Card>
      {/* <GrossProfitDepartment data={grossprofitdepartmentData}/> */}
      {/* <StackedBarChart data={stackedbardata} /> */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Comparision of Sales Stock, Sales Quantity and Delivery Quantity" />
        <ComparisionBarChart data={comparisionbardata} />
        <ComparisionTableComponent data={comparisionbardata} />
      </Card>
      {/* <CumulativeSales data={cumulativechartdata}/> */}
      {/* <ScatterChartPlot data={scatterplotdata} /> */}
      {/* <DonutCharttarget data={donutCharttargetData}/> */}
      {/* <LChart data={salesOverTimeData} /> */}
      {/* <Card className="space-y-4 bg-gray-400">
        
         </Card> */}

      {/* Department */}
      <Card className="space-y-4 bg-slate-800">
      <MapComponent data={MapData} token={process.env.MAP_BOX_TOKEN} />
      </Card>
      <Card className="space-y-4 bg-slate-800">
        <Header title="Department vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <DepartmentSalesComponent data={departmentsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <DepartmentSalesComponentLine data={departmentsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <DepartmentSalesComponentBar data={departmentsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <DepartmentSalesComponentPie data={departmentsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <DepartmentSalesComponentPolar data={departmentsalesdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        {/* <DepartmentSalesComponentBubble data={departmentsalesdata} /> */}
        <DepartmentTableComponent data={departmentsalesdata} />
      </Card>

      <Card className="space-y-4 bg-slate-800">
        <Header title="Department vs Total Sales" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <SalesPerDepartment data={salesperdepartmentdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <SalesPerDepartmentLine data={salesperdepartmentdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <SalesPerDepartmentBar data={salesperdepartmentdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <SalesPerDepartmentPie data={salesperdepartmentdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <SalesPerDepartmentPolar data={salesperdepartmentdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        {/* <DepartmentSalesComponentBubble data={departmentsalesdata} /> */}
        <SalesPerDepartmentTable data={salesperdepartmentdata} />
      </Card>

      {/* customer */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Customer vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <CustomerSalesComponent data={customersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <CustomerSalesComponentLine data={customersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <CustomerSalesComponentBar data={customersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <CustomerSalesComponentPie data={customersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolerArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <CustomerSalesComponentPolar data={customersalesdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        <CustomersTableComponent data={customersalesdata} />
      </Card>

      {/* Matter */}

      <Card className="space-y-4 bg-slate-800">
        <Header title="Matter vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <MatterSalesComponent data={mattersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <MatterSalesComponentLine data={mattersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <MatterSalesComponentBar data={mattersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <MatterSalesComponentPie data={mattersalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <MatterSalesComponentPolar data={mattersalesdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        <MattersTableComponent data={mattersalesdata} />
      </Card>

      {/* construction */}

      <Card className="space-y-4 bg-slate-800">
        <Header title="Construction Sites vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion className="bg-slate-800 dark rounded-b-md">
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ConstructionSalesComponent data={constructionsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion className="bg-slate-800 dark rounded-b-md">
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ConstructionSalesComponentLine data={constructionsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion className="bg-slate-800 dark rounded-b-md">
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ConstructionSalesComponentBar data={constructionsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion className="bg-slate-800 dark rounded-b-md">
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ConstructionSalesComponentPie data={constructionsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion className="bg-slate-800 dark rounded-b-md">
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ConstructionSalesComponentPolar data={constructionsalesdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        {/* <ConstructionSalesComponentRadial data={constructionsalesdata} /> */}
        <ConstructionTableComponent data={constructionsalesdata} />
      </Card>
      {/* <FunnelChartHero data={funnelmatterdata[0]}/> */}

      {/* staff */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Staff vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <StaffSalesComponent data={staffsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <StaffSalesComponentLine data={staffsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <StaffSalesComponentBar data={staffsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <StaffSalesComponentPie data={staffsalesdata} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <StaffSalesComponentPolar data={staffsalesdata} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        <StaffTableComponent data={staffsalesdata} />
      </Card>

      {/* product details */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Product vs Total Profit" />
        <AccordionList className="border border-blue-700">
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Area Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ProductProfitComponent data={salesperproduct} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Line Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ProductProfitComponentLine data={salesperproduct} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Bar Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ProductProfitComponentBar data={salesperproduct} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Pie Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ProductProfitComponentPie data={salesperproduct} />
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              PolarArea Chart
            </AccordionHeader>
            <AccordionBody className="leading-6">
              <ProductProfitComponentPolar data={salesperproduct} />
            </AccordionBody>
          </Accordion>
        </AccordionList>
        <ProductProfitTableComponent data={salesperproduct} />
      </Card>

      {/* Suppliers Details */}

      <Card className="space-y-4 bg-slate-800">
        <Header title="Suppliers vs Products Supplied" />
        <QuoteQuantityPerSupplierComponentBar data={productpersupplier} />
        <ProductsPerSupplierComponentBar data={productpersupplier} />
        <ProductsPerSupplierComponentPie data={productpersupplier} />
        <ProductsPerSupplierTableComponent data={productpersupplier} />
      </Card>

      {/* QuoteQuatityPerProduct */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Product vs Quote Quantity" />
        <QuoteQuantityPerProductComponentBar data={quoteperproduct} />
        <QuotePerProductComponentBar data={quoteperproduct} />
        <QuotePerProductComponentPie data={quoteperproduct} />
        <QuoteQuantityProductTableComponent data={quoteperproduct} />
      </Card>

      {/* QuoteQuatityPerMaker */}
      <Card className="space-y-4 bg-slate-800">
        <Header title="Maker vs Quote Quantity" />
        <QuoteQuantityPerMakerComponentBar data={quotepermaker} />
        <ProductsPerMakersComponentBar data={quotepermaker} />
        <ProductsPerMakerComponentPie data={quotepermaker} />
        <QuoteQuantityMakerTableComponent data={quotepermaker} />
      </Card>
    </div>
  );
}
