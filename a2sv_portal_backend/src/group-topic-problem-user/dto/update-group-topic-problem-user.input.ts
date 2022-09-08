import { CreateGroupTopicProblemUserInput } from './create-group-topic-problem-user.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { UpdateUserInput } from 'src/user/dto/update-user.input'
import { UpdateGroupTopicProblemInput } from 'src/group-topic-problem/dto/update-group-topic-problem.input'

@InputType()
export class UpdateGroupTopicProblemUserInput {
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
  @Field({ nullable: true })
  solutionLink?: string
  @Field(() => Int, { nullable: true })
  attempts?: number
  @Field({ nullable: true })
  needHelp?: boolean
  @Field(() => Boolean, { nullable: true })
  solved?: boolean
}
