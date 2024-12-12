import React, {createContext, useContext, useState} from 'react';

type FilterState={
    month:number;
    year:string| null;
    departments: string[];
    staffs:string[];
};


type FilterContextType={
    filters:FilterState;
    setMonth:(month:number) => void;
    setYear: (year: string| null) =>void;
    setDepartments:(departments:string[]) => void;
    setStaff: (staffs:string[]) => void;
};

const intitialFilterState: FilterState = {
    month: new Date().getMonth()+1,
    year:null,
    departments:[],
    staffs: [],
};

const FilterContext=createContext<FilterContextType | undefined> (undefined);

