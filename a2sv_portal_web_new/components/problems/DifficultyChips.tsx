import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";

type Props = {
    status: ProblemDifficultyType
}

export const DifficultyChips = ({status}:Props) => {
    return (
        <span
            className={clsx(
                "py-1 capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
                status === ProblemDifficultyType.HARD ? "bg-[#D72B2B1C] p-2 text-[#D72B2B]" : "",
                status === ProblemDifficultyType.MEDIUM ? "bg-[#FBC4003D] p-2 text-[#FBC400]" : "",
                status === ProblemDifficultyType.EASY ? "bg-[#5CB85C30] p-2 text-[#5CB85C]" : ""
            )}
        >
            {status}
        </span>
    );
}