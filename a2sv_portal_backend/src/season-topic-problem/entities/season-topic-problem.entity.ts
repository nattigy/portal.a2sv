import { Field, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'
import { SeasonTopicProblemUser } from '../../season-topic-problem-user/entities/season-topic-problem-user.entity'
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
  @Field(() => [SeasonTopicProblemUser], { nullable: true })
  users?: SeasonTopicProblemUser[]
}
