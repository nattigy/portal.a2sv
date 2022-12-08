import { Field, ObjectType } from '@nestjs/graphql'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../../topic/entities/topic.entity'

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

  // @Field(() => [SeasonTopicProblem])
  // seasonTopicProblems: SeasonTopicProblem[]
  //
  // @Field(() => [GroupSeasonTopic], { nullable: true })
  // groupSeasonTopics?: GroupSeasonTopic[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
