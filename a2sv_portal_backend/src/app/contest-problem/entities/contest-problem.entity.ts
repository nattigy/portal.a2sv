import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class ContestProblem {
  @Field()
  contestId: string

  @Field()
  problemId: string

  @Field(() => Problem)
  problem: Problem

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
