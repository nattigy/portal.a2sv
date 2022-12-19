import { Field, ObjectType } from '@nestjs/graphql'
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
