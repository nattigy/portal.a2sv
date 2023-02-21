import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopicResource } from '../../season-topic-resource/entities/season-topic-resource.entity'

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

  @Field(() => [SeasonTopicResource], { nullable: true })
  seasonTopicResources: SeasonTopicResource[]

  @Field(() => [SeasonTopicProblem])
  seasonTopicProblems: SeasonTopicProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
