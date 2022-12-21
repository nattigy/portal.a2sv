import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'
import { UserGroupSeasonTopicProblem } from '../../user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { Topic } from '../../topic/entities/topic.entity'

@ObjectType()
export class UserGroupSeasonTopic {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => Topic)
  topic: Topic

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE

  @Field(() => Int)
  numberOfSolvedProblems: number

  @Field(() => Float)
  comfortabilityPercentage: number

  @Field(() => [UserGroupSeasonTopicProblem])
  userGroupSeasonTopicProblems: UserGroupSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(ComfortLevelEnum, { name: 'ComfortLevelEnum' })
