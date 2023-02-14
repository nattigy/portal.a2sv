import clsx from "clsx";
import { ContestStatus } from "../../types/contest";

type Props = {
  status: ContestStatus | string;
};

export const getStatusTitle = (status: ContestStatus | string) => {
    switch (status) {
        case ContestStatus.SOLVED_IN_CONTEST:
          return "Solved in"
        case ContestStatus.SOLVED_AFTER_CONTEST:
          return "Solved after"
        case ContestStatus.UNABLE_TO_SOLVE:
          return "Unable to solve"
        default:
          return "Not solved"
      }

}

export const getStatusColor = (status: ContestStatus | string) => {
    switch (status) {
        case ContestStatus.SOLVED_IN_CONTEST:
          return "text-[#5CB85C]"
        case ContestStatus.SOLVED_AFTER_CONTEST:
          return "text-primary"
        case ContestStatus.UNABLE_TO_SOLVE:
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
