import { Field, ObjectType } from '@nestjs/graphql'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { GroupSeasonTopic } from '../../group-season-topic/entities/group-season-topic.entity'

@ObjectType()
export class SeasonTopic {
  @Field({ description: 'season id of the season' })
  seasonId: string

  @Field({ description: 'topic id of the topic' })
  topicId: string

  @Field(() => Season, { nullable: true })
  season?: Season

  @Field(() => Topic, { nullable: true })
  topic?: Topic

  @Field(() => [SeasonTopicProblem])
  seasonTopicProblems: SeasonTopicProblem[]

  @Field(() => [GroupSeasonTopic])
  groupSeasonTopics: GroupSeasonTopic[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
