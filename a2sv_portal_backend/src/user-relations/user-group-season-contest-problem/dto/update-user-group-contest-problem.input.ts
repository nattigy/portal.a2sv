import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'

@InputType()
export class UpdateUserGroupContestProblemInput {
  @Field(() => String)
  userId: string

  @Field(() => String)
  contestId: string

  @Field(() => String)
  problemId: string

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number
}
