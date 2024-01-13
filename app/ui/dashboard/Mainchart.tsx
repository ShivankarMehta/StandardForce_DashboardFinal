'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define a custom type for the series
interface MixedChartSeries {
  name: string;
  type: 'line' | 'bar'; // Define the type as either 'line' or 'bar'
  data: number[];
}

export default function MainChartComponent(props) {
    const [series, setSeries] = useState<MixedChartSeries[]>([]);
    const [options, setOptions] = useState<ApexOptions | null>(null);

    useEffect(() => {
        if (!props.data) {
            console.error('Props data is undefined or null:', props.data);
            return;  // Exit early if props.data is undefined or null
        }

        if (!Array.isArray(props.data) || props.data.length === 0) {
            console.error('Props data is not an array or is an empty array:', props.data);
            return;  // Exit early if props.data is not an array or is an empty array
        }
        setSeries([
            {
                name: 'Total Sales',
                type: 'line',
                data: props.data.map(item => item?.Total_Sales || 0)
            },
            {
                name: 'Total Gross Profit',
                type: 'bar',
                data: props.data.map(item => item?.Total_Gross_Profit || 0)
            },
            {
                name: 'Total Sales Bar',
                type: 'bar',
                data: props.data.map(item => item?.Total_Sales || 0)
            },
            {
                name: 'Overall Gross Profit Rate',
                type: 'line',
                data: props.data.map(item => item?.Overall_Gross_Profit_Rate || 0)
            },
            // Add more series if needed
        ]);

        setOptions({
            chart: {
                height: 700,
                type: 'line',
            },
            stroke: {
                curve: 'stepline'
            },
            title: {
                text: 'Sales and Profit Analysis'
            },
            xaxis: {
                categories: props.data.map(item => item?.Sales_Date || ''),
                type: 'category'
            },
            yaxis: {
                title: {
                    text: 'Amount'
                },
                labels: {
                    formatter: function (val) {
                 
                            return '$' + val;
                      
                    }
                }
                
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                }
            },
            colors: ['#425af5', '#5442f5', '#f5426f', '#000000']
        });
    }, [props.data]);

    const chartContainerStyle = "p-6 md:p-10";
    
    return (
        <div className={chartContainerStyle} id="chart">
            {options && <ApexCharts options={options} series={series} type="line" height={700} width={"100%"}/>}
        </div>
    );
};



