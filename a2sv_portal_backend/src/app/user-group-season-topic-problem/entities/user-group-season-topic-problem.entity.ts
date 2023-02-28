import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'
import { UserTopicProblemStatusEnum } from '@prisma/client'

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

  @Field(() => UserTopicProblemStatusEnum)
  status: UserTopicProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Float)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  statusUpdatedAt?: Date
}

registerEnumType(UserTopicProblemStatusEnum, { name: 'UserTopicProblemStatusEnum' })
