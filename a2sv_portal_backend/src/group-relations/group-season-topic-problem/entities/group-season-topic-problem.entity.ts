import { Field, ObjectType } from '@nestjs/graphql'
import { GroupSeasonTopic } from '../../group-season-topic/entities/group-season-topic.entity'
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

  @Field(() => GroupSeasonTopic, { nullable: true })
  groupSeasonTopic?: GroupSeasonTopic

  @Field(() => Problem)
  problem: Problem
}
