import pool from "./pool";
import { unstable_noStore as noStore} from "next/cache";
import { SalesTotalOverTime } from "./definitions";

//Total Sales Over Time
export async function fetchSalesTotalOverTime(): Promise<SalesTotalOverTime[]> {
     noStore();
     console.log('Fetching SalesOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m') AS date, SUM(\`sales_total\`) AS TotalSales
          FROM tomsms_db.t_sales_detail
          GROUP BY date
          ORDER BY date;
     `) as unknown as [SalesTotalOverTime[]];
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to Sales over Time data.');
     }
   }

   export async function fetchTargetSalesTotalOverTime(): Promise<any> {
     noStore();
     console.log('Fetching SalesTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT 
          s.staff_name, 
          SUM(t.target_price) AS Target_Sales
          FROM 
          tomsms_db.t_salestarget_month t
          JOIN 
          tomsms_db.m_staff s ON t.staff_id = s.id
          GROUP BY 
          s.staff_name;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }
   
   export async function fetchSalesQuantityOverTime(): Promise<any> {
     noStore();
     console.log('Fetching SalesQuantityTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m-%d') AS date, SUM(\`sales_quantity\`) AS TotalQuantity
          FROM tomsms_db.t_sales_detail
          GROUP BY \`sales_date\`
          ORDER BY \`sales_date\`
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }
   
   

   export async function fetchTargetTimeSeries(): Promise<any> {
     noStore();
     console.log('Fetching TargetoverTimeSeries data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(STR_TO_DATE(CONCAT(target_ym, '01'), '%Y%m%d'), '%Y-%m')as Year, SUM(target_price) as TotalTarget
          FROM tomsms_db.t_salestarget_month
          GROUP BY target_ym
          ORDER BY target_ym
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }
   

   export async function fetchTotalTargetPerStaff(): Promise<any> {
     noStore();
     console.log('Fetching TotalTargetPerStaff data...');
     try {
          const [rows] = await pool.query(`
          SELECT staff_id as Staff_id, SUM(target_price) as Total_target
           FROM tomsms_db.t_salestarget_month
           GROUP BY staff_id
          ORDER BY staff_id;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch TotalTargetPerStaff data.');
     }
   }

   export async function fetchTargetPerStaffDounut(): Promise<any> {
     noStore();
     console.log('Fetching SalesTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT staff_id as StaffID, SUM(target_price) as Totaltarget
           FROM tomsms_db.t_salestarget_month
           GROUP BY staff_id
          ORDER BY staff_id;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }


   export async function fetchDelieveryQuantityOverTime(): Promise<any> {
     noStore();
     console.log('Fetching SalesQuantityTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m-%d') AS date, SUM(\`delivery_quantity\`) AS TotalDeliveryQuantity
          FROM tomsms_db.t_sales_detail
          GROUP BY \`sales_date\`
          ORDER BY \`sales_date\`
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }


   export async function fetchgrossProfitDepartment(): Promise<any> {
     noStore();
     console.log('Fetching SalesTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT department_name as Department, standard_gross_profit_rate as GrossProfitRate
         FROM tomsms_db.m_department
         where standard_gross_profit_rate > 0; 
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }

   export async function fetchstackedbarchart(): Promise<any> {
     noStore();
     console.log('Fetching SalesTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT
    DATE_FORMAT(STR_TO_DATE(CONCAT(target_ym, '01'), '%Y%m%d'), '%Y-%m') AS month,
    SUM(CASE WHEN staff_id = 6 THEN target_price ELSE 0 END) AS staff_6,
    SUM(CASE WHEN staff_id = 9 THEN target_price ELSE 0 END) AS staff_9,
    SUM(CASE WHEN staff_id = 14 THEN target_price ELSE 0 END) AS staff_14,
    SUM(CASE WHEN staff_id = 15 THEN target_price ELSE 0 END) AS staff_15,
    SUM(CASE WHEN staff_id = 25 THEN target_price ELSE 0 END) AS staff_25,
    SUM(CASE WHEN staff_id = 35 THEN target_price ELSE 0 END) AS staff_35,
    SUM(CASE WHEN staff_id = 40 THEN target_price ELSE 0 END) AS staff_40,
    SUM(CASE WHEN staff_id = 53 THEN target_price ELSE 0 END) AS staff_53,
    SUM(CASE WHEN staff_id = 55 THEN target_price ELSE 0 END) AS staff_55
FROM
    tomsms_db.t_salestarget_month
WHERE
    YEAR(STR_TO_DATE(CONCAT(target_ym, '01'), '%Y%m%d')) = 2023
GROUP BY
    month
ORDER BY
    month;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }

   export async function fetchscatterplotedata(): Promise<any> {
     noStore();
     console.log('Fetching SalesTotalOverTime data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m-%d') as Date ,sales_stock_quantity as Sales_Stock , sales_stock_quantity as Sales_Quantity, sales_total as Sales_Total
          FROM tomsms_db.t_sales_detail
          limit 20;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }

//    export async function fetchCumulativeData(): Promise<any> {
//      noStore();
//      console.log('Fetching CumulativeSalesQuantity data...');
//      try {
//           const [rows] = await pool.query(`
//             SELECT sales_date as date, 
//            SUM(sales_quantity) OVER (ORDER BY sales_date) AS CumulativeSalesQuantity
//            FROM tomsms_db.t_sales_detail
//           ORDER BY sales_date;

//      `);
//      // console.log(rows);
//      return rows;
//      } catch (error) {
//           console.error('Database Error:', error);
//     throw new Error('Failed to fetch staff_targetmonth data.');
//      }
//    }


export async function fetchComparisionChartData(): Promise<any> {
     noStore();
     console.log('Fetching Sales data...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m-%d') as Date, sum(sales_stock_quantity) as SalesStock, sum(sales_quantity) as SalesQuantity, sum(delivery_quantity) as DeliveryQuantity
          FROM tomsms_db.t_sales_detail
          GROUP BY sales_date
          ORDER BY sales_date
          LIMIT 10;
     `);
     // console.log(rows);
     return rows;
     } catch (error) {
          console.error('Database Error:', error);
    throw new Error('Failed to fetch staff_targetmonth data.');
     }
   }

   export async function fetchCardDetails() {
     // Assuming you have a setup for connecting to your database
     console.log('Fetching card Details...');
     try {
          const [rows] = await pool.query(`
          SELECT SUM(sales_total) AS TotalSales,
          SUM(abs(sales_total-cost_total)) AS TotalProfit,
          SUM(sales_quantity) AS TotalSalesQuantity
          FROM tomsms_db.t_sales_detail;
          `);
          return rows;
     } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch Sales Details.');
     }
}

export async function fetchMixedPlot() {
     // Assuming you have a setup for connecting to your database
     console.log('Fetching main chart Details...');
     try {
          const [rows] = await pool.query(`
          SELECT DATE_FORMAT(\`sales_date\`, '%Y-%m-%d') AS Sales_Date, 
       SUM(sales_total) AS Total_Sales,
       SUM(sales_total - cost_total) AS Total_Gross_Profit,
       SUM(sales_total - cost_total) / SUM(sales_total) AS Overall_Gross_Profit_Rate
       FROM tomsms_db.t_sales_detail
       GROUP BY DATE_FORMAT(\`sales_date\`, '%Y-%m-%d')
       LIMIT 15
          `);
          return rows;
     } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch main chart Details.');
     }
}
