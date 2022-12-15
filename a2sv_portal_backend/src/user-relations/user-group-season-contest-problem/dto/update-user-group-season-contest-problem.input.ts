import { Field, InputType, Int } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { UserGroupSeasonContestProblemId } from './create-user-group-season-contest-problem.input'

@InputType()
export class UpdateUserGroupSeasonContestProblemInput {
  @Field(() => UserGroupSeasonContestProblemId)
  id: UserGroupSeasonContestProblemId

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Int)
  numberOfMinutes: number
}
