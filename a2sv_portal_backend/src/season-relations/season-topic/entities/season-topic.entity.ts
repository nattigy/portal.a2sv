import { Field, ObjectType } from '@nestjs/graphql'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../../topic/entities/topic.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'

@ObjectType()
export class SeasonTopic {
  @Field({ description: 'season id of the season' })
  seasonId: string

  @Field({ description: 'topic id of the topic' })
  topicId: string

  @Field(() => Season)
  season: Season

  @Field(() => Topic)
  topic: Topic

  @Field(() => [SeasonTopicProblem])
  seasonTopicProblems: SeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
