import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'
import { UserGroupSeasonTopicProblem } from '../../user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'

@ObjectType()
export class GroupSeasonTopicProblem {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field(() => Problem)
  problem: Problem

  @Field(() => [UserGroupSeasonTopicProblem])
  userGroupSeasonTopicProblems: UserGroupSeasonTopicProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
