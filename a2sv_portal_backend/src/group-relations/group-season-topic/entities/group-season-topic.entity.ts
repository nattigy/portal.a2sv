import { Field, ObjectType } from '@nestjs/graphql'
import { GroupSeasonTopicProblem } from '../../group-season-topic-problem/entities/group-season-topic-problem.entity'

@ObjectType()
export class GroupSeasonTopic {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  topicId: string

  // @Field(() => SeasonTopic, { nullable: true, description: 'Example field (placeholder)' })
  // seasonTopic?: SeasonTopic
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
