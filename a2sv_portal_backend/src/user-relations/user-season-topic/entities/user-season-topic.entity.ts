import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ComfortLevelEnum } from '@prisma/client'
import { UserSeasonTopicProblem } from '../../user-season-topic-problem/entities/user-season-topic-problem.entity'

@ObjectType()
export class UserSeasonTopic {
  @Field()
  userId: string

  @Field()
  topicId: string

  @Field()
  seasonId: string

  @Field(() => ComfortLevelEnum, { defaultValue: ComfortLevelEnum.UNCOMFORTABLE })
  comfortLevel: ComfortLevelEnum = ComfortLevelEnum.UNCOMFORTABLE

  // @Field(() => SeasonTopic)
  // seasonTopic: SeasonTopic
  //
  // @Field(() => UserSeason)
  // userSeason: UserSeason

  @Field(() => [UserSeasonTopicProblem])
  userSeasonTopicProblems: UserSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(ComfortLevelEnum, { name: 'ComfortLevelEnum' })
