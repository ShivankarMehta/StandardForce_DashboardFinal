// // Ensure this script runs in a client environment due to the use of hooks
// "use client";

// // Import necessary components and hooks from React and @tremor/react
// import { useEffect, useState } from "react";
// import { BarChart, Card, Title } from "@tremor/react";

// // Function to format numerical values as currency
// const valueFormatter = (number) =>
//   `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

// // The SalesComparison component
// const SalesComparison = ({ data }) => {
//   // State to hold transformed data suitable for the bar chart
//   const [transformedData, setTransformedData] = useState([]);

//   // Effect hook to transform incoming data into a format suitable for the bar chart
//   useEffect(() => {
//     // Initialize an object to hold data for each month
//     const tempData: any = Array.from({ length: 12 }).reduce(
//       (acc: any, _, index) => {
//         const monthName = new Date(0, index).toLocaleString("default", {
//           month: "long",
//         });
//         acc[monthName] = { Date: monthName }; // Initialize each month with its name
//         return acc;
//       },
//       {}
//     );

//     // Iterate over the incoming data to populate tempData with sales data for each month and year
//     data.forEach(({ Year, Month, Total_Sales }) => {
//       const monthName = new Date(0, Month - 1).toLocaleString("default", {
//         month: "long",
//       });
//       tempData[monthName][`Sales_${Year}`] = Total_Sales; // Assign sales data to the corresponding month and year
//     });

//     // Convert tempData to an array format suitable for the BarChart component
//     const chartData: any = Object.values(tempData);
//     setTransformedData(chartData); // Update state with the transformed data
//   }, [data]); // Re-run the effect if the data prop changes

//   return (
//     <Card>
//       <Title>Sales Per Month</Title>
//       <BarChart
//         style={{ height: "500px" }}
//         className="mt-6"
//         data={transformedData}
//         index="Date"
//         maxValue={300000000} // Set maximum value for the Y-axis
//         categories={["Sales_2022", "Sales_2023", "Sales_2024"]} // Set categories for the bar chart
//         colors={["teal", "amber", "emerald"]} // Set colors for each category
//         yAxisWidth={100} // Set width of the Y-axis
//       />
//     </Card>
//   );
// };

// // Export the SalesComparison component for use in other parts of your application
// export default SalesComparison;


// Ensure this script runs in a client environment due to the use of hooks
"use client";

// Import necessary components and hooks from React and @tremor/react
import { useEffect, useState } from "react";
import { BarChart, Card, Title } from "@tremor/react";

// Function to format numerical values as currency
const valueFormatter = (number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

// The SalesComparison component
const SalesComparison = ({ data }) => {
  // State to hold transformed data suitable for the bar chart
  const [transformedData, setTransformedData] = useState([]);
  // State to hold selected years
  const [selectedYears, setSelectedYears] = useState<number[]>([]);


  // Effect hook to transform incoming data into a format suitable for the bar chart
  useEffect(() => {
    // Initialize an object to hold data for each month
    const tempData:any = Array.from({ length: 12 }).reduce(
      (acc:any, _, index) => {
        const monthName = new Date(0, index).toLocaleString("default", {
          month: "long",
        });
        acc[monthName] = { Date: monthName }; // Initialize each month with its name
        return acc;
      },
      {}
    );

    // Iterate over the incoming data to populate tempData with sales data for each month and year
    data.forEach(({ Year, Month, Total_Sales }) => {
      const monthName = new Date(0, Month - 1).toLocaleString("default", {
        month: "long",
      });
      tempData[monthName][`Sales_${Year}`] = Total_Sales; // Assign sales data to the corresponding month and year
    });

    // Convert tempData to an array format suitable for the BarChart component
    const chartData: any = Object.values(tempData).filter((item: any) => {
      // Filter data based on selected years
      if (selectedYears.length === 0) return true; // If no year is selected, return all data
      return Object.keys(item).some((key) => selectedYears.includes(parseInt(key.substring(6))));
    });
    
    setTransformedData(chartData); // Update state with the transformed data
  }, [data, selectedYears]); // Re-run the effect if the data prop or selectedYears changes

  // Function to handle selection of years
  const handleYearSelection = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  return (
    <Card>
      <Title>Sales Per Month</Title>
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button
          className={selectedYears.includes(2022) ? "selected" : ""}
          onClick={() => handleYearSelection(2022)}
        >
          2022
        </button>
        <button
          className={selectedYears.includes(2023) ? "selected" : ""}
          onClick={() => handleYearSelection(2023)}
        >
          2023
        </button>
        <button
          className={selectedYears.includes(2024) ? "selected" : ""}
          onClick={() => handleYearSelection(2024)}
        >
          2024
        </button>
      </div>
      <BarChart
        style={{ height: "500px" }}
        className="mt-6"
        data={transformedData}
        index="Date"
        maxValue={300000000} // Set maximum value for the Y-axis
        categories={["Sales_2022", "Sales_2023", "Sales_2024"]} // Set categories for the bar chart
        colors={["teal", "amber", "emerald"]} // Set colors for each category
        yAxisWidth={100} // Set width of the Y-axis
      />
      <style jsx>{`
        .filter-buttons {
          margin-bottom: 20px;
        }
        .filter-buttons button {
          margin-right: 10px;
          padding: 5px 10px;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .filter-buttons button:hover {
          background-color: #f0f0f0;
        }
        .filter-buttons button.selected {
          background-color: #007bff;
          color: #fff;
        }
      `}</style>
    </Card>
  );
};

// Export the SalesComparison component for use in other parts of your application
export default SalesComparison;
