import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'
import { Season } from '../../../season-relations/season/entities/season.entity'
import { UserSeasonTopic } from '../../user-season-topic/entities/user-season-topic.entity'

@ObjectType()
export class UserSeason {
  @Field(() => String)
  userId: string

  @Field(() => String)
  seasonId: string

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Season, { nullable: true })
  season: Season

  @Field(() => UserSeasonTopic)
  userSeasonTopics:   UserSeasonTopic[]
  // userSeasonContests UserSeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
