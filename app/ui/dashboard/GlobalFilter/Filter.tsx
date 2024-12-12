'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactSlider from 'react-slider';
import '../../styles/slider.css';
import { useFilterContext } from '@/app/Context/FilterContext';

export default function GlobalFilter({ data}) {
  // Ensure data is defined and valid
  const validData = Array.isArray(data) ? data : [];

  // States for filters
  const { filters, setFilters } = useFilterContext();

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
    setFilters((prev) => {
      const selected = prev[type];
      const newSelection = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...prev, [type]: newSelection };
    });
  };

  

  return (
    <div className="p-6 shadow-md rounded-lg">
      {/* Year Selector */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Year</label>
          <select
            value={filters.year || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                year: e.target.value ? Number(e.target.value) : undefined,
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

        {/* Month Slider */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Select Month</label>
          <ReactSlider
            value={filters.monthRange}
            onChange={(value) => setFilters((prev) => ({ ...prev, monthRange: value as [number, number] }))}
            thumbClassName="thumb"
            trackClassName="track"
            ariaLabel={['Lower thumb', 'Upper thumb']}
            max={12}
            min={1}
            step={1}
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
                <div key={dept} className={`flex items-center space-x-2 p-2 rounded-md ${filters.department.includes(dept) ? 'bg-slate-800 border-2 border-white': ''}`}>
                  <input
                    type="checkbox"
                    id={dept}
                    checked={filters.department.includes(dept)}
                    onChange={() => toggleSelection(dept, 'department')}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={dept}
                    className={`cursor-pointer ${
                      filters.department.includes(dept) ? 'text-gray-100' : 'text-gray-900'
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
                <div key={staffName} className={`flex items-center space-x-2 p-2 rounded-md ${filters.staff.includes(staffName) ? 'bg-slate-800 border-2 border-white': ''}`}>
                  <input
                    type="checkbox"
                    id={staffName}
                    checked={filters.staff.includes(staffName)}
                    onChange={() => toggleSelection(staffName, 'staff')}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={staffName}
                    className={`cursor-pointer ${
                      filters.staff.includes(staffName) ? 'text-gray-100' : 'text-gray-900'
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
