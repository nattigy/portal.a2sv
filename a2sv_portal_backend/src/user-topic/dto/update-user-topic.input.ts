import { CreateUserTopicInput } from './create-user-topic.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserTopicInput extends PartialType(CreateUserTopicInput) {
  @Field(() => String)
  id: string
}
