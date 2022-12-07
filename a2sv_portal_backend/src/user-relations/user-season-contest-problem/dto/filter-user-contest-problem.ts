import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemEnum } from '../entities/user-season-contest-problem-status.enum'

@InputType()
export class FilterUserContestProblemInput {
  @Field(() => String, { nullable: true })
  userId?: string

  @Field(() => String, { nullable: true })
  contestId?: string

  @Field(() => String, { nullable: true })
  problemId?: string

  @Field(() => UserContestProblemEnum, { nullable: true })
  status?: UserContestProblemEnum

  @Field(() => Int, { nullable: true })
  numberOfAttempts?: number

  @Field(() => Int, { nullable: true })
  numberOfMinutes?: number
}
