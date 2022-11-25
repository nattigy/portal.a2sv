import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { GroupStatResponse } from '../../group/dto/group-stat-response'
// import { Entity } from './entity.type'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { User } from '../../user/entities/user.entity'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { Group } from '../../group/entities/group.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { SeasonTopicUserProblem } from '../../season-topic-user-problem/entities/season-topic-user-problem.entity'
import { UserContestProblem } from '../../user-contest-problem/entities/user-contest-problem.entity'
import { UserProfile } from '../../user-profile/entities/user-profile.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  take: number

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  count: number
}

@ObjectType()
export class PaginationGroupContests {
  @Field(() => [GroupContest])
  items: GroupContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserContests {
  @Field(() => [UserContest])
  items: UserContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUser {
  @Field(() => [User])
  items: User[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserTopic {
  @Field(() => [UserTopic])
  items: UserTopic[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserProfile {
  @Field(() => [UserProfile])
  items: UserProfile[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationSeason {
  @Field(() => [Season])
  items: Season[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationSeasonTopic {
  @Field(() => [SeasonTopic])
  items: SeasonTopic[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationSeasonTopicProblem {
  @Field(() => [SeasonTopicProblem])
  items: SeasonTopicProblem[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationSeasonTopicProblemUser {
  @Field(() => [SeasonTopicUserProblem])
  items: SeasonTopicUserProblem[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationTopic {
  @Field(() => [Topic])
  items: Topic[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationContest {
  @Field(() => [Contest])
  items: Contest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserContest {
  @Field(() => [UserContest])
  items: UserContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserContestProblem {
  @Field(() => [UserContestProblem])
  items: UserContestProblem[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationProblem {
  @Field(() => [Problem])
  items: Problem[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationGroup {
  @Field(() => [Group])
  items: Group[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationGroupContest {
  @Field(() => [GroupContest])
  items: GroupContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class GroupStatResponsePage<T> {
  @Field(() => [GroupStatResponse])
  items: T[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

// @ObjectType()
// export class PaginationOutput<T> {
//   @Field(() => [Entity])
//   items: T[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
