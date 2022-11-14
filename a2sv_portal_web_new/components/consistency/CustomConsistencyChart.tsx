import React from "react";
import MonthlyConsistency from "./MonthlyConsistency";

function generateData(count: number, yrange: any) {
    let i = 0;
    const data = Array.from(Array(7).fill([]))

    while (i < count) {
        let x = (i + 1).toString();
        let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const element = {
            x: x,
            y: y,
            date: new Date()
        }
        data[i % 7] = [...data[i % 7], element]
        i++;
    }
    return data.flat();
}

type Props = {};

const CustomConsistencyChart = (props: Props) => {
    const state = {
        series: [
            {
                name: "Jan",
                data: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,

                    {
                        "x": "0",
                        "y": 0,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "15",
                        "y": 6,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "22",
                        "y": 39,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "29",
                        "y": 7,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "2",
                        "y": 26,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "16",
                        "y": 29,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "23",
                        "y": 51,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "30",
                        "y": 26,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "10",
                        "y": 15,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "17",
                        "y": 19,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "24",
                        "y": 54,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "31",
                        "y": 4,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "4",
                        "y": 7,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "11",
                        "y": 36,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "18",
                        "y": 49,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "25",
                        "y": 36,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "32",
                        "y": 5,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "5",
                        "y": 26,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "12",
                        "y": 1,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "19",
                        "y": 37,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "26",
                        "y": 0,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "33",
                        "y": 11,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "6",
                        "y": 1,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "13",
                        "y": 0,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "0",
                        "y": 0,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "27",
                        "y": 9,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "7",
                        "y": 3,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "14",
                        "y": 25,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "21",
                        "y": 1,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "28",
                        "y": 14,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                    {
                        "x": "27",
                        "y": 0,
                        "date": "2022-11-09T18:53:20.983Z"
                    },
                ]
            },

            {
                name: "Feb",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Mar",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Apr",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "May",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Jun",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Jul",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Aug",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Sep",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Oct",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Nov",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
            {
                name: "Dec",
                data: generateData(42, {
                    min: 0,
                    max: 25
                })
            },
        ],
    };

    return (
        <div
            className="flex gap-4 h-max border-8 items-center justify-center bg-gray-200"
        >
            {state.series.map((data, index) => {
                return (
                    <div key={index} className="flex gap-2 flex-col borde-8 border-blue-700">
                        <MonthlyConsistency data={data} />
                        <h2 className="">{data.name}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default CustomConsistencyChart;
