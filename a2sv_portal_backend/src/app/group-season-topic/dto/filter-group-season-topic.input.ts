import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FilterGroupSeasonTopicInput {
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  groupId?: string

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  seasonId?: string

  @Field({ nullable: true, description: 'Example field (placeholder)' })
  topicId?: string
}
