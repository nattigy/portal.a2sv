import { CreateGroupTopicSeasonProblemUserInput } from './create-group-topic-season-problem-user.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupTopicSeasonProblemUserInput extends PartialType(
  CreateGroupTopicSeasonProblemUserInput,
) {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
  @Field(() => Int)
  problemId: number
}
