import {Field, Int, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Problem} from "../../problem/entities/problem.entity";
import {UserContest} from "../../user-contest/entities/user-contest.entity";

@ObjectType()
export class UserContestProblem {
  @Field(() => String)
  userId: string
  @Field(() => String)
  contestId: string
  @Field(() => String)
  problemId: string
  @Field(() => Problem)
  problem: Problem
  @Field(() => UserContestProblemEnum)
  status: UserContestProblemEnum
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
  @Field(() => UserContest)
  userContest: UserContest
}

export enum UserContestProblemEnum {
  SOLVED = "SOLVED",
  NOT_SOLVED = "NOT_SOLVED",
  ATTEMPTED = "ATTEMPTED",
}

registerEnumType(UserContestProblemEnum, {
  name: 'UserContestProblemEnum',
})
