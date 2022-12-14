import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'

@InputType()
export class FilterUserContestProblemInput {
  @Field(() => String, { nullable: true })
  userId?: string

  @Field(() => String, { nullable: true })
  contestId?: string

  @Field(() => String, { nullable: true })
  problemId?: string

  @Field(() => UserContestProblemStatusEnum, { nullable: true })
  status?: UserContestProblemStatusEnum

  @Field(() => Int, { nullable: true })
  numberOfAttempts?: number

  @Field(() => Int, { nullable: true })
  numberOfMinutes?: number
}
