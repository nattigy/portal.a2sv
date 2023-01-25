import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { GroupSeasonTopicProblem } from '../../group-season-topic-problem/entities/group-season-topic-problem.entity'
import { Topic } from '../../topic/entities/topic.entity'

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

  @Field(() => Int)
  numberOfProblems: number

  @Field(() => Float)
  comfortability: number

  @Field(() => [GroupSeasonTopicProblem], { description: 'Example field (placeholder)' })
  groupSeasonTopicProblems: GroupSeasonTopicProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
