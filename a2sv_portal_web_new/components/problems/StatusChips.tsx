import clsx from "clsx";
import { ProblemStatus } from "../../types";
import { ContestStatus } from "../../types/contest";

type Props = {
  status: ContestStatus | ProblemStatus | string;
};

export const getStatusTitle = (status: ContestStatus | ProblemStatus | string) => {
    switch (status) {
        case ContestStatus.SOLVED_IN_CONTEST:
          return "Solved in"
        case ContestStatus.SOLVED_AFTER_CONTEST:
          return "Solved after"
        case ContestStatus.UNABLE_TO_SOLVE || ProblemStatus.UNABLE_TO_SOLVE:
          return "Unable to solve"
        case ProblemStatus.SOLVED:
          return "Solved"
        default:
          return "Not solved"
      }

}

export const getStatusColor = (status: ContestStatus | ProblemStatus | string) => {
  console.log(status)
    switch (status) {
        case ProblemStatus.SOLVED || ContestStatus.SOLVED_IN_CONTEST:
          return "text-[#5CB85C]"
        case ProblemStatus.NOT_SOLVED || ContestStatus.NOT_SOLVED: 
          return "text-primary"
        case ProblemStatus.UNABLE_TO_SOLVE || ContestStatus.UNABLE_TO_SOLVE:
          return "text-[#D72B2B]"
        default:
          return "text-gray-400"
      }

}

export const StatusChips = ({ status }: Props) => {
  return (
    <span
      className={clsx(
        "capitalize leading-wide font-semibold text-xs rounded-full",
        getStatusColor(status)
      )}
    >
      {getStatusTitle(status)}
    </span>
  );
};
