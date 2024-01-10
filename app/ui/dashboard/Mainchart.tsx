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
    // Use the custom MixedChartSeries type for the series state
    const [series, setSeries] = useState<MixedChartSeries[]>([]);
    const [options, setOptions] = useState<ApexOptions | null>(null);

    useEffect(() => {
        if (props.data && Array.isArray(props.data) && props.data.length > 0) {
            setSeries([
                {
                    name: 'Total Sales',
                    type: 'line',
                    data: props.data.map(item => item.Total_Sales)
                },
                {
                    name: 'Total Gross Profit',
                    type: 'bar',
                    data: props.data.map(item => item.Total_Gross_Profit)
                },
                {
                    name: 'Total Sales Bar',
                    type: 'bar',
                    data: props.data.map(item => item.Total_Sales)
                },
                {
                    name: 'Overall Gross Profit Rate',
                    type: 'line',
                    data: props.data.map(item => item.Overall_Gross_Profit_Rate)
                },
                // Add more series if needed
            ]);

            setOptions({
                chart: {
                    height: 700,
                    type: 'line', // Default to line, but each series can override this
                },
                stroke: {
                    curve: 'stepline' // Only affects the line chart
                },
                title: {
                    text: 'Sales and Profit Analysis'
                },
                xaxis: {
                    categories: props.data.map(item => item.Sales_Date),
                    type: 'category'
                },
                yaxis: {
                    title: {
                        text: 'Amount'
                    },
                    labels: {
                        formatter: function (val) {
                            return `$${new Intl.NumberFormat().format(val)}`;
                        }
                    }
                }
                ,
                plotOptions: {
                    bar: {
                        horizontal: false, // Set to true for horizontal bars
                        columnWidth: '80%', // Adjust the width of the bars
                        // Rounded edgs for the bars
                    }
                },
                colors: ['#425af5', '#5442f5', '#f5426f', '#000000'] // Adjust colors for each series
            });
        }
    }, [props.data]);
    const chartContainerStyle = "p-6 md:p-10";
    return (
        <div className={chartContainerStyle} id="chart">
            {options && <ApexCharts options={options} series={series} type="line" height={700} />}
        </div>
    );
};
