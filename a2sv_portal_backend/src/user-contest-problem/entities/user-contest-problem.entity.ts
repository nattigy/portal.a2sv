import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserContestProblemStatus } from '@prisma/client'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { User } from '../../user/entities/user.entity'
import { UserContestProblemEnum } from './user-contest-problem-status.enum'

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
  @Field(() => UserContestProblemEnum)
  status: UserContestProblemStatus
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
  @Field(() => UserContest, { nullable: true })
  userContest?: UserContest
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}