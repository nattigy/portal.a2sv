import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemEnum } from '../entities/user-season-contest-problem-status.enum'

@InputType()
export class UpdateUserContestProblemInput {
  @Field(() => String)
  userId: string
  @Field(() => String)
  contestId: string
  @Field(() => String)
  problemId: string
  @Field(() => UserContestProblemEnum)
  status: UserContestProblemEnum
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
}

@InputType()
export class UserContestProblemId {
  @Field()
  userId: string
  @Field()
  contestId: string
  @Field()
  problemId: string
}
