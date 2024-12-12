'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the structure of the filter context
interface FilterContextType {
  filters: {
    year?: number;
    department: string[];
    staff: string[];
    monthRange: [number, number];
  };
  setFilters: React.Dispatch<React.SetStateAction<FilterContextType['filters']>>;
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterContextType['filters']>({
    year: undefined,
    department: [],
    staff: [],
    monthRange: [1, 12], // Define explicitly as [number, number]
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Hook to use the context
export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
