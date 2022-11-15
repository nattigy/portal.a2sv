import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import { Tooltip } from "../common/Tooltip";

const getBgColorBySubmission = (value: number) => {
    if (value === 0) {
        return "rgba(44, 181, 93, 0.5)"
    }
    else if (value < 3) {
        return "#2CBA5D"
    }
    else if (value < 5) {
        return "rgba(44, 181, 93, 0.5)"
    } else if (value < 10) {
        return "rgba(44, 181, 93, 0.5)"
    } else {
        return "#2CBA5D"
    }
}

export default function MonthlyConsistency(props: any) {
    const { name, data: monthData } = props.data || [
        {
            x: "1",
            y: 2
        },
        {
            x: "2",
            y: 42
        }
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: "12px 12px 12px 12px 12px 12px 12px",
                gridTemplateColumns: "12px",
                gridAutoColumns: "12px",
                gridAutoFlow: "column",
                gridGap: "1px",
            }}
        // className="w-max grid grid-cols-6 gap-0.5 "
        >
            {
                monthData.map((day_data: any, index: number) => {
                    if (day_data === null) {
                        return <Tooltip key={index}/>
                    } else {
                        return <Tooltip key={index} message={`${day_data.y} Submissions on ${format(new Date(day_data.date), "yyyy-MM-dd")}`}>
                            <div
                                style={{
                                    background: getBgColorBySubmission(day_data.y || 0),
                                }}
                                className="h-full w-full rounded-sm  bg-green-900 hover:bg-green-900">
                            </div>
                        </Tooltip>
                    }
                })
            }
        </div >
    );

}
