import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { UpdateUserInput } from 'src/user/dto/update-user.input'

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
  @Field(() => [UpdateTopicInput], { nullable: true })
  topics?: UpdateTopicInput[]
  @Field(() => [UpdateUserInput], { nullable: true })
  users?: UpdateUserInput[]
  @Field(() => Int, { nullable: true })
  headId?: number
  @Field(() => UpdateUserInput, { nullable: true })
  head?: UpdateUserInput
}
