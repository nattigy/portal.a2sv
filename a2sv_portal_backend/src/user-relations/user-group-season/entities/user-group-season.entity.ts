import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'
import { UserGroupSeasonTopic } from '../../user-group-season-topic/entities/user-season-topic.entity'
import { UserGroupSeasonContest } from '../../user-group-season-contest/entities/user-season-contest.entity'

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

  @Field(() => UserGroupSeasonTopic)
  UserGroupSeasonTopics: UserGroupSeasonTopic[]

  // @Field(() => UserGroupSeasonContest)
  // UserGroupSeasonContests: UserGroupSeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
