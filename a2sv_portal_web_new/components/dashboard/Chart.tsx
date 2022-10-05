import React from "react";
import LineChart from "./LineChart";

type Props = {};

const HOAChart = (props: Props) => {
  const chartData = [
    {
      name: "Accepted Submission",
      data: [
        {
          x: "Jan",
          y: 13,
        },
        {
          x: "Feb",
          y: 73,
        },
        {
          x: "Mar",
          y: 23,
        },
        {
          x: "Apr",
          y: 180,
        },
        {
          x: "May",
          y: 56,
        },
        {
          x: "Jun",
          y: 123,
        },
        {
          x: "Jul",
          y: 85,
        },
        {
          x: "Aug",
          y: 54,
        },
        {
          x: "Sep",
          y: 92,
        },
        {
          x: "Oct",
          y: 24,
        },
        {
          x: "Nov",
          y: 56,
        },
        {
          x: "Dec",
          y: 100,
        },
      ],
    },
    {
      name: "Wrong Submission",
      data: [
        {
          x: "Jan",
          y: 34,
        },
        {
          x: "Feb",
          y: 165,
        },
        {
          x: "Mar",
          y: 52,
        },
        {
          x: "Apr",
          y: 320,
        },
        {
          x: "May",
          y: 109,
        },
        {
          x: "Jun",
          y: 213,
        },
        {
          x: "Jul",
          y: 185,
        },
        {
          x: "Aug",
          y: 94,
        },
        {
          x: "Sep",
          y: 162,
        },
        {
          x: "Oct",
          y: 49,
        },
        {
          x: "Nov",
          y: 115,
        },
        {
          x: "Dec",
          y: 129,
        },
      ],
    },
  ];

  const defaultDataList = chartData.map((item, index) => ({
    name: item.name,
    data: item.data,
  }));

  console.log(defaultDataList);

  return (
    <div>
      <LineChart dataList={defaultDataList} />
    </div>
  );
};

export default HOAChart;
