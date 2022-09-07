import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'
import { CreateTopicInput } from './create-topic.input'

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => Int)
  id: number
  // @Field(() => [UpdateGroupInput], {nullable: true})
  // groups?: UpdateGroupInput[]
}
