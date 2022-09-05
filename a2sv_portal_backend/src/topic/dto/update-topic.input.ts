import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateTopicInput } from './create-topic.input'

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => Int)
  id: number
}
