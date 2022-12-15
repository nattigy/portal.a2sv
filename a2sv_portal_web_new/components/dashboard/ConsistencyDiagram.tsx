import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useStudentConsistencyData } from "../../lib/hooks/useStudentStats";
import { LoaderSmall } from "../common/Loaders";
import CustomConsistencyChart from "../consistency/CustomConsistencyChart";

export type ProblemSolvedProps = {};

type Props = {
  problemSolvedProps: ProblemSolvedProps;
};

var months = [];
const height: Array<number> = [
  11, 14, 12, 15, 9, 11, 12, 2, 4, 8, 8, 9, 6, 10, 16, 5, 9, 10, 4, 2, 0, 2,
  4, 2, 0, 7, 5, 3, 4, 2,
];
const maxi = height.reduce((a, b) => Math.max(a, b), -Infinity);
for (var i = 0; i < 30; i++) {
  months.push(
    <div
      style={{
        height: `${Math.floor((height[i] / maxi) * 100)}px`,
      }}
      className={`w-2 rounded-md flex flex-none bg-[#5956E9]`}
      key={i}
    ></div>
  );
}

function getFirstDayOfMonth(year: any, month: any) {
  return new Date(year, month, 1).getDate();
}
function getLastDayOfMonth(year: any, month: any) {
  return new Date(year, month + 1, 0).getDate();
}

const generateData: any = (studentData: any) => {
  const series = [
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ]
    ,
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ],
    [
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null
    ]
  ]
  let totalWrongSubmissions = 0;
  let totalAcceptedSubmissions = 0;

  const month_names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  let i = 0;

  while (i < studentData.length) {
    const stat = new Date(studentData[i].createdAt);
    const firstDayCurrentMonth = getFirstDayOfMonth(stat.getFullYear(), stat.getMonth(),);
    const lastDayCurrentMonth = getLastDayOfMonth(stat.getFullYear(), stat.getMonth());
    const startMonth = stat.getMonth();
    const startDayOfMonth = stat.getDay();
    console.log(startMonth, firstDayCurrentMonth, lastDayCurrentMonth, startDayOfMonth, "--", i)
    let start = startDayOfMonth;
    for (let curr_day = 0; curr_day < lastDayCurrentMonth; curr_day++) {
      const currStat = studentData[i + curr_day]
      series[startMonth][start + curr_day] = { ...currStat };
      totalAcceptedSubmissions += currStat.solvedCount;
      totalWrongSubmissions += currStat.wrongCount;
    }
    i += lastDayCurrentMonth;
  }
  const studentConsistencyData = series.map((data, index) => {
    return {
      data,
      name: month_names[index]
    }
  })
  return { studentConsistencyData, totalAcceptedSubmissions, totalWrongSubmissions };
}

const ConsistencyDiagramItem = () => {
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, refetch } = useStudentConsistencyData(authUser.id)
  const [consistencyData, setConsistencyData] = useState({
    studentConsistencyData: [], totalAcceptedSubmissions: 0, totalWrongSubmissions: 0
  })

  useEffect(() => {
    if (data) {
      console.log(data, " is data")
      setConsistencyData(data?.dataAnalytic)
    }
  }, [data, refetch])

  return (
    <div className="no-scrollbar w-full h-full flex flex-col  justify-between bg-white rounded-md p-6">
      <div className="flex flex-col">
        <h1 className="font-semibold">Consistency Chart</h1>
        <div className="flex justify-end py-2 gap-x-4">
          {/* <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">2022</h1>
            <FaChevronRight />
          </div> */}
          {/* <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">May</h1>
            <FaChevronRight />
          </div> */}
          <div className="flex flex-col justify-end items-end">
            <div className="flex items-center gap-x-2 ">
              <div className="text-sm  w-3 h-3 relative flex flex-col bg-primary rounded-sm items-center group"></div>
              <p className="text-xs">Total Accepted</p>
            </div>
            <p className="text-2xl font-semibold">{consistencyData.totalAcceptedSubmissions}</p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className="flex items-center gap-x-2 ">
              <div className="text-sm  w-3 h-3 relative flex flex-col bg-primary rounded-sm items-center group"></div>
              <p className="text-xs">Total Submissions</p>
            </div>
            <p className="text-2xl font-semibold">{consistencyData.totalAcceptedSubmissions + consistencyData.totalWrongSubmissions}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-3 items-end h-full">
        {loading && (
          <div className="flex items-center justify-center w-full">
            <LoaderSmall />

          </div>
        )}
        {data && (
          <CustomConsistencyChart series={consistencyData.studentConsistencyData} />

        )}
        {/* <ConsistencyDiagramItem /> */}
      </div>
    </div>
  );
};

export default ConsistencyDiagramItem;
