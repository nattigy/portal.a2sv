import { Field, InputType, Int, OmitType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { CreateGroupInput } from './create-group.input'

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field(() => Int)
  id: number
  @Field(() => [UpdateTopicInput], { nullable: true })
  topics?: UpdateTopicInput[]
}
