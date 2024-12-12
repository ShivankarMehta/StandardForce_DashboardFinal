'use client'
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CardContent } from "@/components/ui/card";


const SalesPerYearTableComponent: React.FC<any> = ({ data }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  return (
    <CardContent className="overflow-x-auto"> {/* Allows horizontal scrolling */}
      <div className="overflow-hidden rounded-lg border border-gray-300"> {/* Add rounded-lg to the container */}
        <Table className="table-fixed w-full border-collapse">
          {/* Header with hover and rounded top corners */}
          <TableHeader>
            <TableRow className="hover:bg-slate-200 bg-slate-900 hover:text-black text-white transition-all rounded-t-lg text-sm md:text-xl">
              {keys.map((key, index) => (
                <TableHead
                  key={key}
                  className={`px-4 text-left ${
                    index === 0 ? "w-1/4" : "w-1/6"
                  }`} /* Set column widths explicitly */
                >
                  {key}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body with row styling */}
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={`bg-slate-100 hover:bg-slate-300 text-black transition-all text-xs md:text-sm ${
                  index === data.length - 1 ? "rounded-b-lg" : ""
                }`} // Add rounded-b-lg to the last row
              >
                <TableCell className="px-4 py-2 text-left">
                  {monthNames[parseInt(item.month) - 1]}
                </TableCell>
                <TableCell className="px-4 py-2 text-left">
                  ¥ {item.sales_2022.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 text-left">
                  ¥ {item.sales_2023.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 text-left">
                  ¥ {item.sales_2031.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-2 text-left">
                  ¥ {item.sales_2032.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  );
};

export default SalesPerYearTableComponent;
