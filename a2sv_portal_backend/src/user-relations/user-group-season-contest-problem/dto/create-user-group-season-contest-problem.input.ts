import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { Problem } from 'src/problem/entities/problem.entity'

@InputType()
export class CreateUserGroupSeasonContestProblemInput {
  @Field()
  userId: string

  @Field()
  contestId: string

  @Field()
  problemId: string

  @Field()
  groupId: string

  @Field(() => Problem)
  problem: Problem

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number
}

@InputType()
export class UserGroupSeasonContestProblemId {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  contestId: string

  @Field()
  problemId: string
}
