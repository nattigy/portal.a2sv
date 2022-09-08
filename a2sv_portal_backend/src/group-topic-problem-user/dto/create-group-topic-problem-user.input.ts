import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdateGroupTopicProblemInput } from 'src/group-topic-problem/dto/update-group-topic-problem.input'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { User } from 'src/user/entities/user.entity'

@InputType()
export class CreateGroupTopicProblemUserInput {
  @Field(() => Int)
  problemId: number
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  userId: number
  @Field(() => UpdateGroupTopicProblemInput, { nullable: true })
  groupTopicProblem?: UpdateGroupTopicProblemInput
  @Field(() => UpdateUserInput, { nullable: true })
  user?: UpdateUserInput
}
