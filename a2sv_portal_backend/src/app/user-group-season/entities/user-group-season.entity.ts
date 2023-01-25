import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'
import { UserGroupSeasonTopic } from '../../user-group-season-topic/entities/user-group-season-topic.entity'
import { UserGroupSeasonContest } from '../../user-group-season-contest/entities/user-group-season-contest.entity'

@ObjectType()
export class UserGroupSeason {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field(() => User)
  user: User

  @Field(() => Float)
  rank: number

  @Field(() => Int)
  totalSubmissions: number

  @Field(() => Int)
  totalAcceptedSubmissions: number

  @Field(() => Float)
  acceptanceRate: number

  @Field(() => Float)
  averageContestRating: number

  @Field(() => Int)
  totalContestsAttended: number

  @Field(() => UserGroupSeasonTopic)
  userGroupSeasonTopics: UserGroupSeasonTopic[]

  @Field(() => UserGroupSeasonContest)
  userGroupSeasonContests: UserGroupSeasonContest[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
