import React from "react";
import dynamic from "next/dynamic";
import { ProblemDifficultyType } from "../../types/problems";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  difficulty: ProblemDifficultyType;
  totalProblems: number;
  solvedProblems: number;
};

const RadialBar = (props: Props) => {
  const backgroundColor =
    props.difficulty == ProblemDifficultyType.EASY
      ? "#1FCE6721"
      : props.difficulty == ProblemDifficultyType.MEDIUM
      ? "#FFF0E1"
      : "#FB502121";
  const mainColor =
    props.difficulty == ProblemDifficultyType.EASY
      ? "#1FCE67"
      : props.difficulty == ProblemDifficultyType.MEDIUM
      ? "#FCAB5E"
      : "#FB5021";

  const options: ApexCharts.ApexOptions | undefined = {
    chart: {
      type: "radialBar",
    },
    colors: [mainColor],

    series: [97],

    plotOptions: {
      radialBar: {
        track: {
          margin: 0,
          background: "#FF000000",
        },

        hollow: {
          margin: 0,
          size: "75%",
        },

        dataLabels: {
          // showOn: "always",
          name: {
            show: false,
          },
          value: {
            color: "#111",
            fontSize: "10px",
            fontFamily: "Poppins",
            fontWeight: "700",
            offsetY: 3,
            show: true,
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
  };

  const series = [
    Math.floor((props.solvedProblems / props.totalProblems) * 100),
  ];

  return (
    <div
      className="rounded-lg w-20 h-24"
      style={{
        background: backgroundColor,
      }}
    >
      <Chart options={options} series={series} type="radialBar" height={90} />
      <div
        className="font-semibold text-[10px] flex flex-col items-center -my-3"
        style={{
          color: mainColor,
        }}
      >
        <p>{props.difficulty}</p>
        <p>
          {props.solvedProblems}/{props.totalProblems}
        </p>
      </div>
    </div>
  );
};

export default RadialBar;
