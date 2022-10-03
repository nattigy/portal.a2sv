import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateGroupTopicSeasonProblemInput {
  @Field(() => Int)
  problemId
  @Field(() => Int)
  groupId
  @Field(() => Int)
  topicId
  @Field(() => Int)
  seasonId
  @Field(() => Int)
  userId
}
