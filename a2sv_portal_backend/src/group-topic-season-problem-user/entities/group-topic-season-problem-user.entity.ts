import { ObjectType, Field, Int } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { GroupTopicSeasonProblem } from '../../group-topic-season-problem/entities/group-topic-season-problem.entity'

@ObjectType()
export class GroupTopicSeasonProblemUser {
  @Field(() => Int)
  groupId: number
  @Field(() => Int)
  topicId: number
  @Field(() => Int)
  seasonId: number
  @Field(() => Int)
  problemId: number
  @Field(() => Int)
  userId: number
  @Field(() => User, { nullable: true })
  user?: User
  @Field(() => [GroupTopicSeasonProblem], { nullable: true })
  groupTopicSeasonProblems?: GroupTopicSeasonProblem[]
}
