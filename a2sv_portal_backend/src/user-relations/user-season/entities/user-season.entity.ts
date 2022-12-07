import { ObjectType, Field, Int } from '@nestjs/graphql'

import { Season } from '../../season/entities/season.entity'
import { User } from '../../user/entities/user.entity'

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

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
