import { Field, InputType, Int } from '@nestjs/graphql'
import { UserGroupSeasonTopicProblemId } from './create-user-season-topic-problem.input'

@InputType()
export class UpdateUserGroupSeasonTopicProblemInput {
  @Field()
  id: UserGroupSeasonTopicProblemId

  @Field({ nullable: true })
  solved?: boolean

  @Field(() => Int, { nullable: true })
  attempts?: number

  @Field({ nullable: true })
  needHelp?: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int, { nullable: true })
  timeDedicated?: number
}
