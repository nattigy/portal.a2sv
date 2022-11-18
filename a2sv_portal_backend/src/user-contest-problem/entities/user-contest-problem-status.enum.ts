import { registerEnumType } from '@nestjs/graphql'

export enum UserContestProblemEnum {
  SOLVED_IN_CONTEST = 'SOLVED_IN_CONTEST',
  SOLVED_AFTER_CONTEST = 'SOLVED_AFTER_CONTEST',
  NOT_SOLVED = 'NOT_SOLVED',
  UNABLE_TO_SOLVE = 'UNABLE_TO_SOLVE'
}

registerEnumType(UserContestProblemEnum, {
  name: 'UserContestProblemEnum',
})
