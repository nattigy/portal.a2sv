import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateTopicInput } from './create-topic.input'

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field()
  topicId: string
}
