import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GroupStatResponse } from '../../group/dto/group-stat-response'
import { UserSeasonContest } from '../../user-season-contest/entities/user-season-contest.entity'
import { User } from '../../user/entities/user.entity'
import { Season } from '../../season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { Group } from '../../group/entities/group.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'
import { SeasonTopicProblem } from '../../season-topic-problem/entities/season-topic-problem.entity'
import { UserSeasonTopicProblem } from '../../user-season-topic-problem/entities/user-season-topic-problem.entity'
import { UserContestProblem } from '../../user-season-contest-problem/entities/user-season-contest-problem.entity'
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
export class PaginationUserContests {
  @Field(() => [UserSeasonContest])
  items: UserSeasonContest[]

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
  @Field(() => [UserSeasonTopicProblem])
  items: UserSeasonTopicProblem[]

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
  @Field(() => [UserSeasonContest])
  items: UserSeasonContest[]

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
