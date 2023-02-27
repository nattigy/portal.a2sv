import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { ContestProblem } from '../../contest-problem/entities/contest-problem.entity'

@ObjectType()
export class Contest {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  link: string

  @Field({ nullable: true })
  div?: string

  // @Field(() => GraphQLISODateTime)
  // startTime: Date
  //
  // @Field(() => GraphQLISODateTime)
  // endTime: Date

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  duration: string

  @Field(() => [ContestProblem])
  contestProblems: ContestProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
