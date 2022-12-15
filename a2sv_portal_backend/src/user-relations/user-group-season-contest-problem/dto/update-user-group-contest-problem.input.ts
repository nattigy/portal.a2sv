import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { Problem } from 'src/problem/entities/problem.entity'

@InputType()
export class UpdateUserGroupContestProblemInput {
  @Field(() => String)
  userId: string

  @Field(() => String)
  contestId: string

  @Field(() => String)
  problemId: string

  @Field(() => Problem)
  problem: Problem

  @Field()
  groupId: string

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number
}
