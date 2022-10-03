import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AddTopicToGroupInput {
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
  @Field(() => Int)
  groupId: number
}
