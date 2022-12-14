import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../../problem/entities/problem.entity'

@ObjectType()
export class UserGroupSeasonTopicProblem {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  topicId: string

  @Field()
  problemId: string

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

  @Field(() => Problem, { nullable: true })
  problem?: Problem

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
