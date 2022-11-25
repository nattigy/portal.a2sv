import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";

type Props = {
  status: ProblemDifficultyType | string;
};

export const DifficultyChips = ({ status }: Props) => {
  return (
    <div
      className={clsx(
        " w-20 text-center capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
        status === ProblemDifficultyType.HARD
          ? "bg-[#D72B2B1C] p-1 text-[#D72B2B]"
          : "",
        status === ProblemDifficultyType.MEDIUM
          ? "bg-[#FBC4003D] p-1 text-[#FBC400]"
          : "",
        status === ProblemDifficultyType.EASY
          ? "bg-[#5CB85C30] p-1 text-[#5CB85C]"
          : ""
      )}
    >
      {status}
    </div>
  );
};
