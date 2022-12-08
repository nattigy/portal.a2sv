import { Field, ObjectType } from '@nestjs/graphql'
import { SeasonTopic } from '../../../season-relations/season-topic/entities/season-topic.entity'
import { GroupSeason } from '../../group-season/entities/group-season.entity'

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

  @Field(() => GroupSeason, { description: 'Example field (placeholder)' })
  groupSeason: GroupSeason

  // @Field(() => [GroupSeasonTopicProblem], { description: 'Example field (placeholder)' })
  // groupSeasonTopicProblems: GroupSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
