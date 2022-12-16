import { Field, ObjectType } from '@nestjs/graphql'
import { GroupSeasonTopicProblem } from '../../group-season-topic-problem/entities/group-season-topic-problem.entity'
import { SeasonTopic } from '../../../season-relations/season-topic/entities/season-topic.entity'
import { Topic } from '../../../topic/entities/topic.entity'

@ObjectType()
export class GroupSeasonTopic {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string

  @Field(() => Topic)
  topic: Topic
  //
  // @Field(() => GroupSeason, { nullable: true, description: 'Example field (placeholder)' })
  // groupSeason?: GroupSeason

  @Field(() => [GroupSeasonTopicProblem], { description: 'Example field (placeholder)' })
  groupSeasonTopicProblems: GroupSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
