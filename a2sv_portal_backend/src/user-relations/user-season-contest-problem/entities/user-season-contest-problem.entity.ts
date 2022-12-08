import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { Problem } from '../../../problem/entities/problem.entity'
import { UserSeasonContest } from '../../user-season-contest/entities/user-season-contest.entity'

@ObjectType()
export class UserContestProblem {
  @Field()
  userId: string

  @Field()
  contestId: string

  @Field()
  problemId: string

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => UserSeasonContest)
  userSeasonContest: UserSeasonContest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(UserContestProblemStatusEnum, { name: 'UserContestProblemStatusEnum' })
