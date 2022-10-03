import { ObjectType, Field, Int } from '@nestjs/graphql'
import { GroupTopicSeason } from '../../group-topic-season/entities/group-topic-season.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { GroupTopicSeasonProblemUser } from '../../group-topic-season-problem-user/entities/group-topic-season-problem-user.entity'

@ObjectType()
export class GroupTopicSeasonProblem {
  @Field(() => Int)
  problemId
  @Field(() => Int)
  groupId
  @Field(() => Int)
  topicId
  @Field(() => Int)
  seasonId
  @Field(() => [GroupTopicSeason], { nullable: true })
  seasonGroupTopics?: GroupTopicSeason[]
  @Field(() => Problem, { nullable: true })
  problem?: Problem
  @Field(() => [GroupTopicSeasonProblemUser], { nullable: true })
  users?: GroupTopicSeasonProblemUser[]
}
