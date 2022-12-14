import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'

@InputType()
export class CreateUserGroupContestProblemInput {
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
}
