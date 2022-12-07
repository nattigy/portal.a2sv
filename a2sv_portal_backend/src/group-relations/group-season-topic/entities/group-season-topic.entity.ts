import { Field, ObjectType } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { SeasonTopic } from '../../../season-relations/season-topic/entities/season-topic.entity'
import { GroupSeasonTopicProblem } from '../../group-season-topic-problem/entities/group-season-topic-problem.entity'

@ObjectType()
export class GroupSeasonTopic {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string

  @Field(() => SeasonTopic, { description: 'Example field (placeholder)' })
  seasonTopic: SeasonTopic

  @Field(() => [GroupSeasonTopicProblem], { description: 'Example field (placeholder)' })
  groupSeasonTopicProblems: GroupSeasonTopicProblem[]

  @Field(() => Group, { description: 'Example field (placeholder)' })
  group: Group

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
