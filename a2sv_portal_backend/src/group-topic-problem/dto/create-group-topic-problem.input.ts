import { InputType, Int, Field } from '@nestjs/graphql'
import { PartialType } from '@nestjs/mapped-types'
import { GroupTopicProblemUser } from 'src/group-topic-problem-user/entities/group-topic-problem-user.entity'
import { GroupTopic } from 'src/group-topic/entities/group-topic.entity'
import { UpdateGroupInput } from 'src/groups/dto/update-group.input'
import { UpdateProblemInput } from 'src/problem/dto/update-problem.input'

@InputType()
export class CreateGroupTopicProblemInput {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  problemId: number
  @Field(() => UpdateGroupInput)
  groupTopic: UpdateGroupInput
  @Field(() => UpdateProblemInput)
  problem: UpdateProblemInput
}
