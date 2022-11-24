import { Field, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'
import { SeasonTopicUserProblem } from '../../season-topic-user-problem/entities/season-topic-user-problem.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'

@ObjectType()
export class SeasonTopicProblem {
  @Field()
  seasonId: string
  @Field()
  topicId: string
  @Field()
  problemId: string
  @Field(() => SeasonTopic)
  seasonTopic: SeasonTopic
  @Field(() => Problem)
  problem: Problem
  @Field(() => [SeasonTopicUserProblem], { nullable: true })
  users?: SeasonTopicUserProblem[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
