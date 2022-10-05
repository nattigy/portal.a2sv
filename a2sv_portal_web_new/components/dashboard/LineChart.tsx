import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  dataList: any;
};

const LineChart = (props: Props) => {
  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12",
      offsetY: 4,
      markers: {
        radius: 0,
        height: 9,
        width: 9,
      },
    },
    colors: ["#8A70D6", "#FCAB5E"],
    markers: {
      size: 0.5,
      colors: ["#0E9CFF", "#7DAC7E"],
      shape: "circle",
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
  };
  return (
    <Chart
      width={630}
      type="line"
      height={300}
      options={options}
      series={props.dataList}
    />
  );
};

export default LineChart;
