import { CreateGroupTopicSeasonProblemInput } from './create-group-topic-season-problem.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupTopicSeasonProblemInput extends PartialType(
  CreateGroupTopicSeasonProblemInput,
) {
  @Field(() => Int)
  problemId
  @Field(() => Int)
  groupId
  @Field(() => Int)
  topicId
  @Field(() => Int)
  seasonId
}
