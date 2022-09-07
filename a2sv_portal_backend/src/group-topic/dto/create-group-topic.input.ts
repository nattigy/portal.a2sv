import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateGroupTopicInput {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
}
