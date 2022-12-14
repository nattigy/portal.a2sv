import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'
import { UserGroupSeasonTopicProblem } from '../../user-group-season-topic-problem/entities/user-season-topic-problem.entity'
import { SeasonTopic } from '../../../season-relations/season-topic/entities/season-topic.entity'

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

  @Field(() => SeasonTopic)
  seasonTopic: SeasonTopic

  // @Field(() => UserGroupSeason)
  // UserGroupSeason: UserGroupSeason

  @Field(() => [UserGroupSeasonTopicProblem])
  UserGroupSeasonTopicProblems: UserGroupSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(ComfortLevelEnum, { name: 'ComfortLevelEnum' })
