import { registerEnumType } from '@nestjs/graphql'

export enum UserContestProblemEnum {
  SOLVED = 'SOLVED',
  NOT_SOLVED = 'NOT_SOLVED',
  UNATTEMPTED = 'UNATTEMPTED',
}

registerEnumType(UserContestProblemEnum, {
  name: 'UserContestProblemEnum',
})
