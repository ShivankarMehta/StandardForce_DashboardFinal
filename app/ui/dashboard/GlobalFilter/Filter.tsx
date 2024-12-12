'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactSlider from 'react-slider';
import '../../styles/slider.css';

export default function GlobalFilter({ data }) {
  // Ensure data is defined and valid
  const validData = Array.isArray(data) ? data : [];

  // States for filters
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [range, setRange] = useState([1, 12]);

  const [isDepartmentMenuOpen, setDepartmentMenuOpen] = useState(false);
  const [isStaffMenuOpen, setStaffMenuOpen] = useState(false);

  const departmentMenuRef = useRef<HTMLDivElement>(null);
  const staffMenuRef = useRef<HTMLDivElement>(null);

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"];
  const fiscalMonthIndex = (date: Date) => (date.getMonth() + 3) % 12;

  // Extract unique years, departments, and staff from the data
  const years = useMemo(() => {
    const uniqueYears = new Set(
      validData.map((item) => {
        const date = new Date(item.sales_date); // Ensure sales_date is converted to Date
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

  const toggleDepartment = (value: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(value)
        ? prev.filter((dept) => dept !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  // Toggle selection for staff
  const toggleStaff = (value: string) => {
    setSelectedStaff((prev) =>
      prev.includes(value)
        ? prev.filter((staff) => staff !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  return (
    <div className="p-6 shadow-md rounded-lg">
      {/* Year Selector */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Year</label>
          <select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
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

        {/* Month Slider */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Month</label>
          <ReactSlider
            defaultValue={range}
            thumbClassName="thumb"
            trackClassName="track"
            ariaLabel={['Lower thumb', 'Upper thumb']}
            value={range}
            onChange={setRange}
            max={12}
            min={1}
            step={1}
            minDistance={0}
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

      {/* Department and Staff Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Department Selector */}
        <div className="relative flex flex-col space-y-12" ref={departmentMenuRef}>
          <button
            className="w-[100%] p-2 bg-gray-800 text-white rounded-md focus:ring focus:ring-blue-500"
            onClick={() => setDepartmentMenuOpen((prev) => !prev)}
          >
            Select Departments
          </button>
          {isDepartmentMenuOpen && (
            <div className="absolute z-50 w-[100%] p-4 rounded-md shadow-md border bg-white border-gray-700">
              <div className="text-gray-900 font-semibold">Departments</div>
              <hr className="my-2 border-gray-600" />
              {departments.map((dept) => (
                <div key={dept} className={`flex items-center space-x-2 p-2 rounded-md ${selectedDepartments.includes(dept) ? 'bg-slate-800 border-2 border-white': ''}`}>
                  <input
                    type="checkbox"
                    id={dept}
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => toggleDepartment(dept)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={dept}
                    className={`cursor-pointer ${
                      selectedDepartments.includes(dept) ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {dept}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Staff Selector */}
        <div className="relative flex flex-col space-y-12" ref={staffMenuRef}>
          <button
            className="w-[100%] p-2 bg-gray-800 text-white rounded-md focus:ring focus:ring-blue-500"
            onClick={() => setStaffMenuOpen((prev) => !prev)}
          >
            Select Staff
          </button>
          {isStaffMenuOpen && (
            <div className="absolute z-50 w-[100%] p-4 rounded-md shadow-md border bg-white border-gray-700">
              <div className="text-gray-900 font-semibold">Staff</div>
              <hr className="my-2 border-gray-600" />
              {staff.map((staffName) => (
                <div key={staffName} className={`flex items-center space-x-2 p-2 rounded-md ${selectedStaff.includes(staffName) ? 'bg-slate-800 border-2 border-white': ''}`}>
                  <input
                    type="checkbox"
                    id={staffName}
                    checked={selectedStaff.includes(staffName)}
                    onChange={() => toggleStaff(staffName)}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={staffName}
                    className={`cursor-pointer ${
                      selectedStaff.includes(staffName) ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {staffName}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
