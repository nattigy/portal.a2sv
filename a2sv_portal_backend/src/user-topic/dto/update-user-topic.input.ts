import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserTopicInput } from './create-user-topic.input'

@InputType()
export class UpdateUserTopicInput extends PartialType(CreateUserTopicInput) {
  @Field(() => String)
  id: string
}
