import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserContestProblemStatus } from '@prisma/client'
import { Problem } from '../../problem/entities/problem.entity'
import { UserSeasonContest } from '../../user-season-contest/entities/user-season-contest.entity'
import { UserContestProblemEnum } from './user-season-contest-problem-status.enum'

@ObjectType()
export class UserContestProblem {
  @Field(() => String)
  userId: string

  @Field(() => String)
  contestId: string

  @Field(() => String)
  problemId: string

  @Field(() => UserContestProblemEnum)
  status: UserContestProblemStatus

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => UserSeasonContest, { nullable: true })
  userContest?: UserSeasonContest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
