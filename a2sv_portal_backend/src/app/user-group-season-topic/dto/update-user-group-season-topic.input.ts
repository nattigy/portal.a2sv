import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserGroupSeasonTopicInput } from './create-user-group-season-topic.input'

@InputType()
export class UpdateUserGroupSeasonTopicInput extends PartialType(
  CreateUserGroupSeasonTopicInput,
) {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string
}
