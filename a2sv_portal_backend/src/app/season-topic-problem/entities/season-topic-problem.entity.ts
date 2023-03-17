import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class SeasonTopicProblem {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field(() => Problem)
  problem: Problem

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
