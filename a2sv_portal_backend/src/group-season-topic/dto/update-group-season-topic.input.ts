import { CreateGroupSeasonTopicInput } from './create-group-season-topic.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateGroupSeasonTopicInput extends PartialType(CreateGroupSeasonTopicInput) {
  @Field(() => Int)
  id: number
}
