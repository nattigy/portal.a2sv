import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { CreateUserGroupSeasonContestProblemInput } from './create-user-group-season-contest-problem.input'

@InputType()
export class UpdateUserGroupSeasonContestProblemInput extends PartialType(
  CreateUserGroupSeasonContestProblemInput,
) {
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

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number
}
