import { Field, InputType, Int } from '@nestjs/graphql'
import { UserGroupSeasonTopicProblemId } from './create-user-group-season-topic-problem.input'

@InputType()
export class UpdateUserGroupSeasonTopicProblemInput {
  @Field()
  id: UserGroupSeasonTopicProblemId

  @Field({ defaultValue: false })
  solved: boolean

  @Field(() => Int, { defaultValue: 0 })
  attempts: number

  @Field({ defaultValue: false })
  needHelp: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int)
  timeDedicated: number
}
