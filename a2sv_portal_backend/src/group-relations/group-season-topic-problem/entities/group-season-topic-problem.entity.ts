import { Field, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../../problem/entities/problem.entity'

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
}
