import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { UpdateSeasonInput } from '../../season/dto/update-season.input'
import { UpdateGroupTopicSeasonInput } from '../../group-topic-season/dto/update-group-topic-season.input'

@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  country?: string
  @Field({ nullable: true })
  school?: string
  @Field(() => Int)
  id: number
  @Field(() => [UpdateGroupTopicSeasonInput], { nullable: true })
  seasonTopics?: UpdateGroupTopicSeasonInput[]
  @Field(() => [UpdateUserInput], { nullable: true })
  users?: UpdateUserInput[]
  @Field(() => Int, { nullable: true })
  headId?: number
  @Field(() => UpdateUserInput, { nullable: true })
  head?: UpdateUserInput
  @Field(() => Int, { defaultValue: 1 })
  currentSeasonId = 1
}
