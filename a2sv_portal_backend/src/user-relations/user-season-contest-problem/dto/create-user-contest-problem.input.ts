import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemEnum } from '../entities/user-season-contest-problem-status.enum'

@InputType()
export class CreateUserContestProblemInput {
  @Field()
  userId: string
  @Field()
  contestId: string
  @Field()
  problemId: string
  @Field(() => UserContestProblemEnum)
  status: UserContestProblemEnum
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
}
