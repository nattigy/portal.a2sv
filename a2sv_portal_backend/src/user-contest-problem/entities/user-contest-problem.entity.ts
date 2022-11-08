import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { User } from '../../user/entities/user.entity'

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
  @Field(() => User, { nullable: true })
  user?: User
  @Field(() => Contest, { nullable: true })
  contest?: Contest
  // @Field(() => UserContestProblemEnum)
  // status: UserContestProblemEnum
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
  @Field(() => UserContest, { nullable: true })
  userContest?: UserContest
}

export enum UserContestProblemEnum {
  SOLVED = 'SOLVED',
  NOT_SOLVED = 'NOT_SOLVED',
  ATTEMPTED = 'ATTEMPTED',
}

registerEnumType(UserContestProblemEnum, {
  name: 'UserContestProblemEnum',
})
