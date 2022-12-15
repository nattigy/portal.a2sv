import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'
import { UserGroupSeasonTopic } from '../../user-group-season-topic/entities/user-group-season-topic.entity'

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
  userGroupSeasonTopics: UserGroupSeasonTopic[]

  // @Field(() => UserGroupSeasonContest)
  // userGroupSeasonContests: UserGroupSeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
