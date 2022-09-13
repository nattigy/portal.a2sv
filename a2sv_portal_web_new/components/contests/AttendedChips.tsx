import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";

type Props = {
    status: boolean;
}

export const AttendedChips = ({ status }: Props) => {
    return (
        <span
            className={clsx(
                "py-1 px-5 capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
                status == true ? "bg-[#5CB85C30] p-2 text-[#5CB85C]" : "bg-[#D72B2B1C] p-2 text-[#D72B2B]",
            )}
        >
            {status ? "YES" : "NO"}
        </span>
    );
}