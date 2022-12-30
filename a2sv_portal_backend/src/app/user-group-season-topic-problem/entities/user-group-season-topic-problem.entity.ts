import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
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

  // @Field({ defaultValue: false })
  // solved: boolean

  @Field(() => UserTopicProblemStatusEnum, {
    defaultValue: UserTopicProblemStatusEnum.NOT_SOLVED,
  })
  status: UserTopicProblemStatusEnum

  @Field(() => Int, { defaultValue: 0 })
  numberOfAttempts: number

  // @Field({ defaultValue: false })
  // needHelp: boolean

  @Field({ nullable: true })
  solutionLink?: string

  @Field(() => Int)
  numberOfMinutes: number

  @Field(() => Problem)
  problem: Problem

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(UserTopicProblemStatusEnum, { name: 'UserTopicProblemStatusEnum' })
