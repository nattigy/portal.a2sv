import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonTopicInput {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string
}

@InputType()
export class GroupSeasonTopicId {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string
}
