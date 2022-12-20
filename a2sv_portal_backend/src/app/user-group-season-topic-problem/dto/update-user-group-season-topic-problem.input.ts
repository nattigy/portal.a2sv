import { Field, InputType, Int } from '@nestjs/graphql'
import { UserGroupSeasonTopicProblemId } from './user-group-season-topic-problem-id.input'
import { UserTopicProblemStatusEnum } from '@prisma/client'

@InputType()
export class UpdateUserGroupSeasonTopicProblemInput {
  @Field()
  id: UserGroupSeasonTopicProblemId

  @Field(() => UserTopicProblemStatusEnum, {defaultValue: UserTopicProblemStatusEnum.NOT_SOLVED})
  status?: UserTopicProblemStatusEnum

  @Field(() => Int, { defaultValue: 0 })
  numberOfAttempts?: number

  // @Field({ defaultValue: false })
  // needHelp: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int)
  numberOfMinutes?: number
}
