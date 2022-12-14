import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'
import { Season } from '../../../season-relations/season/entities/season.entity'
import { UserSeasonTopic } from '../../user-group-season-topic/entities/user-season-topic.entity'
import { Group } from '../../../group-relations/group/entities/group.entity'

@ObjectType()
export class UserGroupSeason {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Group, { nullable: true })
  group: Group

  @Field(() => Season, { nullable: true })
  season: Season

  @Field(() => UserSeasonTopic)
  userSeasonTopics: UserSeasonTopic[]
  // userSeasonContests UserSeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
