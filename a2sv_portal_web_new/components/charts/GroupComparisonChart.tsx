import dynamic from 'next/dynamic';
import React from 'react'
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
type Props = {}

const GroupComparisonChart = (props: Props) => {
    const series = [{
        name: 'Average',
        data: [4, 5, 3, 5, 2, 5, 3, 2]
    }, {
        name: 'Highest',
        data: [6, 7, 5, 6, 7, 5, 6, 4]
    }]
    const options: ApexCharts.ApexOptions | undefined | any = {
        chart: {
            type: 'bar',
            height: 350,
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1,
            // curve: "smooth",
            // colors: ["#5956E9", "#5956E930"]
        },
        xaxis: {
            categories: ['G12', 'G31', 'G32', 'G33', 'G41', 'G42', 'G43', 'G44'],
        },
        yaxis: {
            title: {
                text: 'Contest Score'
            }
        },
        colors: [
            "#5956E9", "#5956E930"
        ],
        grid: {
            show: true,
            borderColor: '#90A4AE60',
            strokeDashArray: 3,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            row: {
                colors: undefined,
                opacity: 0.5
            },
            column: {
                colors: undefined,
                opacity: 0.5
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        fill: {
            opacity: 1,
            colors: [
                "#5956E9", "#5956E930"
            ],
        },
        tooltip: {
            y: {
                formatter: function (val: any) {
                    return val
                }
            }
        }
    };

    return (
        <div className='w-full h-full '>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default GroupComparisonChart