import { CreateGroupSeasonTopicInput } from './create-group-season-topic.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonTopicInput extends PartialType(CreateGroupSeasonTopicInput) {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string
}
