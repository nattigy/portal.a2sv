import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateGroupTopicSeasonInput {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
}
