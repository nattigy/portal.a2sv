import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {};

const TotalRadialBar = (props: Props) => {
  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#E6EBF8",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: "700",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "diagonal1",
        gradientToColors: ["#5F72BE", "#9921E8"],
        stops: [0, 50],
      },
    },
    labels: ["Average Results"],
  };

  const series = [76];

  return (
    <Chart options={options} series={series} type="radialBar" width={175} />
  );
};

export default TotalRadialBar;
