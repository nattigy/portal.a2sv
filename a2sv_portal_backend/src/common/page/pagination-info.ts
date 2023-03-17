import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserGroupSeasonContest } from '../../app/user-group-season-contest/entities/user-group-season-contest.entity'
import { User } from '../../app/user/entities/user.entity'
import { Season } from '../../app/season/entities/season.entity'
import { Topic } from '../../app/topic/entities/topic.entity'
import { Contest } from '../../app/contest/entities/contest.entity'
import { Problem } from '../../app/problem/entities/problem.entity'
import { Group } from '../../app/group/entities/group.entity'
import { SeasonTopic } from '../../app/season-topic/entities/season-topic.entity'
import { SeasonTopicProblem } from '../../app/season-topic-problem/entities/season-topic-problem.entity'
import { UserGroupSeasonTopicProblem } from '../../app/user-group-season-topic-problem/entities/user-group-season-topic-problem.entity'
import { UserGroupSeasonContestProblem } from '../../app/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import { UserProfile } from '../../app/user-profile/entities/user-profile.entity'
import { UserGroupSeasonTopic } from '../../app/user-group-season-topic/entities/user-group-season-topic.entity'
import { GroupSeason } from '../../app/group-season/entities/group-season.entity'
import { GroupSeasonContest } from '../../app/group-season-contest/entities/group-season-contest.entity'

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
export class PaginationUserGroupSeasonContests {
  @Field(() => [UserGroupSeasonContest])
  items: UserGroupSeasonContest[]

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
export class PaginationUserGroupSeasonTopic {
  @Field(() => [UserGroupSeasonTopic])
  items: UserGroupSeasonTopic[]

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
export class PaginationUserGroupSeasonTopicProblem {
  @Field(() => [UserGroupSeasonTopicProblem])
  items: UserGroupSeasonTopicProblem[]

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
export class PaginationUserGroupSeasonContest {
  @Field(() => [UserGroupSeasonContest])
  items: UserGroupSeasonContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserGroupSeasonContestProblem {
  @Field(() => [UserGroupSeasonContestProblem])
  items: UserGroupSeasonContestProblem[]

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
export class PaginationGroupSeason {
  @Field(() => [GroupSeason])
  items: GroupSeason[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationGroupSeasonContest {
  @Field(() => [GroupSeasonContest])
  items: GroupSeasonContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

// @ObjectType()
// export class GroupStatResponsePage<T> {
//   @Field(() => [GroupStatResponse])
//   items: T[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }

// @ObjectType()
// export class PaginationOutput<T> {
//   @Field(() => [Entity])
//   items: T[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
