import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateSeasonTopicResourceInput } from './create-season-topic-resource.input'

@InputType()
export class UpdateSeasonTopicResourceInput extends PartialType(
  CreateSeasonTopicResourceInput,
) {
  @Field()
  id: string

  @Field()
  seasonId: string

  @Field()
  topicId: string
}
