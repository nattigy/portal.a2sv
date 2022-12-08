import { Field, ObjectType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'
import { UserSeason } from '../../user-season/entities/user-season.entity'
import { SeasonTopic } from '../../../season-relations/season-topic/entities/season-topic.entity'

@ObjectType()
export class UserSeasonTopic {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE

  @Field(() => SeasonTopic)
  seasonTopic: SeasonTopic

  @Field(() => UserSeason)
  userSeason: UserSeason

  // userSeasonTopicProblems UserSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
