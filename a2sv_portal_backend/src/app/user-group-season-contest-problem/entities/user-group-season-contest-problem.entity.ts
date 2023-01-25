import { Field, Float, GraphQLISODateTime, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserContestProblemStatusEnum } from '@prisma/client'
import { Problem } from '../../problem/entities/problem.entity'

@ObjectType()
export class UserGroupSeasonContestProblem {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  contestId: string

  @Field()
  problemId: string

  @Field(() => UserContestProblemStatusEnum)
  status: UserContestProblemStatusEnum

  @Field(() => Int)
  numberOfAttempts: number

  @Field(() => Float)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

registerEnumType(UserContestProblemStatusEnum, { name: 'UserContestProblemStatusEnum' })
