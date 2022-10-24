import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { UpdateGroupInput } from 'src/group/dto/update-group.input'
import { CreateTopicInput } from './create-topic.input'

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => String)
  id: string
}
