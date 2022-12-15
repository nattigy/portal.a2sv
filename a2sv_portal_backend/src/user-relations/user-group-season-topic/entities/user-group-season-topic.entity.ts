import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'
import { UserGroupSeasonTopicProblem } from '../../user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'

@ObjectType()
export class UserGroupSeasonTopic {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field()
  seasonId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE

  @Field(() => [UserGroupSeasonTopicProblem])
  userGroupSeasonTopicProblems: UserGroupSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(ComfortLevelEnum, { name: 'ComfortLevelEnum' })
