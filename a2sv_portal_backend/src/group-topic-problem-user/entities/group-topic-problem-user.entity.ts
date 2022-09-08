import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GroupTopicProblem } from 'src/group-topic-problem/entities/group-topic-problem.entity'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class GroupTopicProblemUser {
  @Field(() => Int)
  problemId: number
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  userId: number
  @Field(() => GroupTopicProblem, { nullable: true })
  groupTopicProblem: GroupTopicProblem
  @Field(() => User, { nullable: true })
  user: User
  @Field({ defaultValue: false })
  solved: boolean
  @Field({ nullable: true })
  solutionLink?: string
  @Field(() => Int, { defaultValue: 0 })
  attempts: number
  @Field({ defaultValue: false })
  needHelp: boolean
}
