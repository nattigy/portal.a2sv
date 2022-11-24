import React from "react";
import MonthlyConsistency from "./MonthlyConsistency";
type Props = {
  series: Array<any>;
};

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
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },

      {
        name: "Feb",
        data: [
          null,
          null,
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },

      {
        name: "Mar",
        data: [
          null,
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },
      {
        name: "Apr",
        data: [
          null,
          null,
          null,
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },
      {
        name: "May",
        data: [
          null,
          null,
          null,
          null,
          null,
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },
      {
        name: "Jun",
        data: [
          null,
          null,
          null,
          null,
          null,
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "15",
            y: 6,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "22",
            y: 39,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "29",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "2",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "16",
            y: 29,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "23",
            y: 51,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "30",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "10",
            y: 15,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "17",
            y: 19,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "24",
            y: 54,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "31",
            y: 4,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "4",
            y: 7,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "11",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "18",
            y: 49,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "25",
            y: 36,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "32",
            y: 5,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "5",
            y: 26,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "12",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "19",
            y: 37,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "26",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "33",
            y: 11,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "6",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "13",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "0",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 9,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "7",
            y: 3,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "14",
            y: 25,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "21",
            y: 1,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "28",
            y: 14,
            date: "2022-11-09T18:53:20.983Z",
          },
          {
            x: "27",
            y: 0,
            date: "2022-11-09T18:53:20.983Z",
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full px-2 flex h-50 gap-x-2 overflow-x-scroll items-center bg-[rgba(89, 86, 233, 0.05)] py-5 bg-primary/5 no-scrollbar">
      {props.series.map((data, index) => {
        return (
          <div
            key={index + data}
            className="flex gap-2 flex-col items-center border-blue-700"
          >
            {/* <div className="border h-20 w-20"></div> */}
            <MonthlyConsistency data={data} />
            <h2 className="">{data.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default CustomConsistencyChart;
