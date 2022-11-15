import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import { Tooltip } from "../common/Tooltip";

const getBgColorBySubmission = (value: number) => {
    if (value === 0) {
        return "rgba(89, 86, 233, 0.1)"
    }
    else if (value < 2) {
        return "rgba(89, 86, 233, 0.2)"
    }
    else if (value < 3) {
        return "rgba(89, 86, 233, 0.4)"
    }
    else if (value < 5) {
        return "rgba(89, 86, 233, 0.5)"
    }
    else if (value < 10) {
        return "rgba(89, 86, 233, 0.6)"
    }
    else if (value < 15) {
        return "rgba(89, 86, 233, 0.8)"
    } else {
        return "#5956E9"
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
                gridTemplateRows: "13px 13px 13px 13px 13px 13px 13px",
                gridTemplateColumns: "13px",
                gridAutoColumns: "13px",
                gridAutoFlow: "column",
                gridGap: "4px",
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
                                className="h-full w-full rounded-sm  bg-primary hover:bg-primary">
                            </div>
                        </Tooltip>
                    }
                })
            }
        </div >
    );

}
