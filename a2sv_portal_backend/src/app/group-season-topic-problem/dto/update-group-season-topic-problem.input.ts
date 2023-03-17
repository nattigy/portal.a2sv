import { CreateGroupSeasonTopicProblemInput } from './create-group-season-topic-problem.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonTopicProblemInput extends PartialType(
  CreateGroupSeasonTopicProblemInput,
) {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string
}
