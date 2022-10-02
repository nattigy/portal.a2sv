import { InputType, Field, Int } from '@nestjs/graphql'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'
import { UpdateTopicInput } from 'src/topic/dto/update-topic.input'
import { UpdateProblemInput } from 'src/problem/dto/update-problem.input'

@InputType()
export class UpdateGroupTopicInput {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => UpdateGroupInput, { nullable: true })
  group?: UpdateGroupInput
  @Field(() => UpdateTopicInput, { nullable: true })
  topic?: UpdateTopicInput
  @Field(() => [UpdateProblemInput], { nullable: true })
  problems?: UpdateProblemInput[]
  @Field(() => Int)
  seasonId?: number
}
