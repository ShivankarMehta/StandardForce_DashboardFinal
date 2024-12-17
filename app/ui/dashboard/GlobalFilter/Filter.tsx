'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactSlider from 'react-slider';
import '../../styles/slider.css';
import { useFilterContext } from '@/app/Context/FilterContext';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

type FilterType = {
  year: any; // Allows any type for the year
  monthRange: any; // Allows any type for the monthRange
  department: any; // Allows any type for the department
  staff: any; // Allows any type for the staff
};

export default function GlobalFilter({ data}) {
  // Ensure data is defined and valid
  const validData = Array.isArray(data) ? data : [];

  // States for filters
  const { filters, setFilters } = useFilterContext();
  const [temporaryFilters, setTemporaryFilters]= useState<any>({
    year: filters.year || null,
    monthRange: filters.monthRange || [1, 12],
    department: filters.department || [],
    staff: filters.staff || [],
  })

  const [isDepartmentMenuOpen, setDepartmentMenuOpen] = useState(false);
  const [isStaffMenuOpen, setStaffMenuOpen] = useState(false);

  const departmentMenuRef = useRef<HTMLDivElement>(null);
  const staffMenuRef = useRef<HTMLDivElement>(null);

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"];
  const fiscalMonthIndex = (date: Date) => (date.getMonth() + 3) % 12;
  const currentYear = new Date().getFullYear();
  const currentMonth = fiscalMonthIndex(new Date());

  // Extract unique years, departments, and staff from the data
  const years = useMemo(() => {
    const uniqueYears = new Set(
      validData.map((item) => {
        const date = new Date(item.sales_date);
        const year = date.getFullYear();
        return fiscalMonthIndex(date) < 3 ? year - 1 : year;
      })
    );
    return Array.from(uniqueYears).sort((a, b) => a - b);
  }, [validData]);



  const departments = useMemo(() => {
    const uniqueDepartments = new Set(validData.map((item) => item.department_name));
    return Array.from(uniqueDepartments);
  }, [validData]);

  const staff = useMemo(() => {
    const uniqueStaff = new Set(validData.map((item) => item.staff_name));
    return Array.from(uniqueStaff);
  }, [validData]);


  useEffect(()=>{
    setFilters({
      year: currentYear,
      monthRange: [currentMonth, currentMonth],
      department: departments,
      staff: staff,
    });
    setTemporaryFilters({
      year: currentYear,
      monthRange: [currentMonth, currentMonth],
      department: departments,
      staff: staff,
    })
  }, [currentYear, currentMonth, departments, staff, setFilters]);

  const saveFilters = () => {
    setFilters(temporaryFilters);
  };


  // Event listeners to close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departmentMenuRef.current && !departmentMenuRef.current.contains(event.target as Node)) {
        setDepartmentMenuOpen(false);
      }
      if (staffMenuRef.current && !staffMenuRef.current.contains(event.target as Node)) {
        setStaffMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSelection = (value: string, type: 'department' | 'staff') => {
    setTemporaryFilters((prev) => {
      const selected = prev[type];
      const newSelection = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...prev, [type]: newSelection };
    });
  };
 
   useEffect(() => {
    setFilters({
      year: currentYear,
      monthRange: [currentMonth, currentMonth], // Set to current month
      department: departments, // Select all departments
      staff: staff, // Select all staff
    });
  }, [currentYear, currentMonth, departments, staff, setFilters]);

    const resetFilters = () => {
    const defaultFilters: FilterType = {
      year: currentYear,
      monthRange: [currentMonth, currentMonth],
      department: departments,
      staff: staff,
    };
    setTemporaryFilters(defaultFilters);
    setFilters(defaultFilters);
  };
  

  return (
    <div className="p-6 shadow-md border-2 border-slate-800 rounded-lg">
     <div className="flex justify-end">
     <button
          onClick={saveFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mr-2"
        >
          Save
        </button>
      <button
      onClick={resetFilters}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Reload
      </button>
     </div>

      {/* Year Selector */}
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Year</label>
          <select
            value={temporaryFilters.year || ''}
            onChange={(e) =>
              setTemporaryFilters((prev) => ({
                ...prev,
                year: e.target.value ? Number(e.target.value) : null,
              }))}
            className="w-[180px] bg-gray-800 text-white p-2 rounded-md"
          >
            <option value="" disabled>Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Department and Staff Selectors */}
      <div className="mt-1">
      <label className="text-sm font-medium">Select Departments</label>
      <MultiSelect
      className="w-[600px] mb-4 dark"
      placeholder="Select Departments"
      value={temporaryFilters.department}
      onValueChange={(selectedValues) =>
        setTemporaryFilters((prev) => ({
          ...prev,
          department: selectedValues || [], // Update department filter based on the selected values
        }))
      }
    >
      {departments.map((dept) => (
        <MultiSelectItem value={dept} key={dept}>
          {dept}
        </MultiSelectItem>
      ))}
    </MultiSelect>
    <label className="text-sm font-medium">Select Staffs</label>
    <MultiSelect
      className="w-[600px] dark"
      placeholder="Select Staffs"
      value={temporaryFilters.staff}
      onValueChange={(selectedValues) =>
        setTemporaryFilters((prev) => ({
          ...prev,
          staff: selectedValues || [], // Update department filter based on the selected values
        }))
      }
    >
      {staff.map((staff) => (
        <MultiSelectItem value={staff} key={staff}>
          {staff}
        </MultiSelectItem>
      ))}
    </MultiSelect>

        {/* Staff Selector */}

      </div>
      </div>
       {/* Month Slider */}
       <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Month</label>
          <ReactSlider
            value={temporaryFilters.monthRange}
            onChange={(value) => setTemporaryFilters((prev) => ({ ...prev, monthRange: value as [number, number] }))}
            thumbClassName="thumb"
            trackClassName="track"
            ariaLabel={['Lower thumb', 'Upper thumb']}
            max={12}
            min={1}
            className="horizontal-slider mt-2"
          />
          <div className="month-labels flex justify-between mt-2 text-gray-800">
            {months.map((month, index) => (
              <div key={index} className="text-xs text-center">
                {month}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}


// "use client";

// import React, { useRef, useState, useEffect, useMemo } from "react";
// import ReactSlider from "react-slider";
// import "../../styles/slider.css";
// import { MultiSelect, MultiSelectItem } from "@tremor/react";
// import { useFilterContext } from "@/app/Context/FilterContext";

// export default function GlobalFilter({ data }) {
//   // Ensure data is defined and valid
//   const validData = Array.isArray(data) ? data : [];

//   // States for filters
//   const { filters, setFilters } = useFilterContext();
//   const [temporaryFilters, setTemporaryFilters] = useState({
//     year: filters.year || null,
//     monthRange: filters.monthRange || [1, 12],
//     department: filters.department || [],
//     staff: filters.staff || [],
//   });

//   const months = [
//     "Oct",
//     "Nov",
//     "Dec",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "June",
//     "July",
//     "Aug",
//     "Sep",
//   ];
//   const fiscalMonthIndex = (date: Date) => (date.getMonth() + 3) % 12;
//   const currentYear = new Date().getFullYear();
//   const currentMonth = fiscalMonthIndex(new Date());

//   // Extract unique years, departments, and staff from the data
//   const years = useMemo(() => {
//     const uniqueYears = new Set(
//       validData.map((item) => {
//         const date = new Date(item.sales_date);
//         const year = date.getFullYear();
//         return fiscalMonthIndex(date) < 3 ? year - 1 : year;
//       })
//     );
//     return Array.from(uniqueYears).sort((a, b) => a - b);
//   }, [validData]);

//   const departments = useMemo(() => {
//     const uniqueDepartments = new Set(validData.map((item) => item.department_name ||));
//     return Array.from(uniqueDepartments);
//   }, [validData]);

//   const staff = useMemo(() => {
//     const uniqueStaff = new Set(validData.map((item) => item.staff_name));
//     return Array.from(uniqueStaff);
//   }, [validData]);

//   useEffect(() => {
//     setFilters({
//       year: currentYear,
//       monthRange: [currentMonth, currentMonth],
//       department: departments,
//       staff: staff,
//     });
//     setTemporaryFilters({
//       year: currentYear,
//       monthRange: [currentMonth, currentMonth],
//       department: departments,
//       staff: staff,
//     });
//   }, [currentYear, currentMonth, departments, staff, setFilters]);

//   const saveFilters = () => {
//     setFilters(temporaryFilters);
//   };

//   const resetFilters = () => {
//     const defaultFilters = {
//       year: currentYear,
//       monthRange: [currentMonth, currentMonth],
//       department: departments,
//       staff: staff,
//     };
//     setTemporaryFilters(defaultFilters);
//     setFilters(defaultFilters);
//   };

//   return (
//     <div className="p-6 shadow-md border-2 border-slate-800 rounded-lg">
//       <div className="flex justify-end">
//         <button
//           onClick={saveFilters}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mr-2"
//         >
//           Save
//         </button>
//         <button
//           onClick={resetFilters}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//         >
//           Reload
//         </button>
//       </div>

//       {/* Year Selector */}
//       <div className="flex space-x-4">
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm font-medium">Select Year</label>
//           <MultiSelect
//             className="w-[180px] bg-gray-800 text-white p-2 rounded-md"
//             value={temporaryFilters.year ? [String(temporaryFilters.year)] : []}
//             onValueChange={(values) =>
//               setTemporaryFilters((prev) => ({
//                 ...prev,
//                 year: values.length > 0 ? Number(values[0]) : null,
//               }))
//             }
//           >
//             {years.map((year) => (
//               <MultiSelectItem key={year} value={String(year)}>
//                 {year}
//               </MultiSelectItem>
//             ))}
//           </MultiSelect>
//         </div>
//       </div>

//       {/* Department and Staff Selectors */}
//       <div className="flex space-x-4 mt-8">
//         {/* Department Selector */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm font-medium">Select Departments</label>
//           <MultiSelect
//             className="w-[300px] bg-gray-800 text-white p-2 rounded-md"
//             value={temporaryFilters.department}
//             onValueChange={(values) =>
//               setTemporaryFilters((prev) => ({ ...prev, department: values }))
//             }
//             placeholder="Select Departments"
//           >
//             {departments.map((dept) => (
//               <MultiSelectItem key={dept} value={dept}>
//                {String(dept).toLowerCase()} {/* Safely convert to lowercase */}
//               </MultiSelectItem>
//             ))}
//           </MultiSelect>
//         </div>

//         {/* Staff Selector */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm font-medium">Select Staff</label>
//           <MultiSelect
//             className="w-[300px] bg-gray-800 text-white p-2 rounded-md"
//             value={temporaryFilters.staff}
//             onValueChange={(values) =>
//               setTemporaryFilters((prev) => ({ ...prev, staff: values }))
//             }
//             placeholder="Select Staff"
//           >
//             {staff.map((staffName) => (
//               <MultiSelectItem key={staffName} value={staffName}>
//                 {String(staffName).toLowerCase()} {/* Safely convert to lowercase */}
//               </MultiSelectItem>
//             ))}
//           </MultiSelect>
//         </div>
//       </div>

//       {/* Month Slider */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm font-medium">Select Month</label>
//         <ReactSlider
//           value={temporaryFilters.monthRange}
//           onChange={(value) =>
//             setTemporaryFilters((prev) => ({ ...prev, monthRange: value as [number, number] }))
//           }
//           thumbClassName="thumb"
//           trackClassName="track"
//           ariaLabel={["Lower thumb", "Upper thumb"]}
//           max={12}
//           min={1}
//           className="horizontal-slider mt-2"
//         />
//         <div className="month-labels flex justify-between mt-2 text-gray-800">
//           {months.map((month, index) => (
//             <div key={index} className="text-xs text-center">
//               {month}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
