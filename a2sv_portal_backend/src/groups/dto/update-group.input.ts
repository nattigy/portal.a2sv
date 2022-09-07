import { Field, InputType, Int, OmitType } from '@nestjs/graphql'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { CreateGroupInput } from './create-group.input'


@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => [UpdateTopicInput], {nullable: true})
  topics: UpdateTopicInput[]

}
