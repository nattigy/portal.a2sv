import { Field, InputType, Int } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { CreateGroupInput } from './create-group.input'

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field(() => Int)
  id: number
  @Field(() => [UpdateTopicInput], { nullable: true })
  topics?: UpdateTopicInput[]
  @Field(() => [UpdateUserInput], { nullable: true })
  users?: UpdateUserInput[]
}
