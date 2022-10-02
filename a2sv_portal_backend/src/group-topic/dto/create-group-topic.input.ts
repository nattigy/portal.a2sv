import { InputType, Int, Field } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { GroupTopic } from '../entities/group-topic.entity'

@InputType()
export class CreateGroupTopicInput extends PartialType(GroupTopic) {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
}
