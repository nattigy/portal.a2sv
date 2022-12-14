import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../../problem/entities/problem.entity'

@ObjectType()
export class UserGroupSeasonTopicProblem {
  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

  @Field()
  userId: string

  @Field({ defaultValue: false })
  solved: boolean

  @Field(() => Int, { defaultValue: 0 })
  attempts: number

  @Field({ defaultValue: false })
  needHelp: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int)
  timeDedicated: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
