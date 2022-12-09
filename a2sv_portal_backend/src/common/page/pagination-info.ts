import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserSeasonContest } from '../../user-relations/user-season-contest/entities/user-season-contest.entity'
import { User } from '../../user-relations/user/entities/user.entity'
import { Season } from '../../season-relations/season/entities/season.entity'
import { Topic } from '../../topic/entities/topic.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { Group } from '../../group-relations/group/entities/group.entity'
import { SeasonTopic } from '../../season-relations/season-topic/entities/season-topic.entity'
import { SeasonTopicProblem } from '../../season-relations/season-topic-problem/entities/season-topic-problem.entity'
import {
  UserSeasonTopicProblem,
} from '../../user-relations/user-season-topic-problem/entities/user-season-topic-problem.entity'
import {
  UserSeasonContestProblem,
} from '../../user-relations/user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserProfile } from '../../user-relations/user-profile/entities/user-profile.entity'
import { UserSeasonTopic } from '../../user-relations/user-season-topic/entities/user-season-topic.entity'
import { GroupSeason } from '../../group-relations/group-season/entities/group-season.entity'

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
export class PaginationUserSeasonContests {
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
export class PaginationUserSeasonTopic {
  @Field(() => [UserSeasonTopic])
  items: UserSeasonTopic[]

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
export class PaginationUserSeasonTopicProblem {
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
export class PaginationUserSeasonContest {
  @Field(() => [UserSeasonContest])
  items: UserSeasonContest[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class PaginationUserSeasonContestProblem {
  @Field(() => [UserSeasonContestProblem])
  items: UserSeasonContestProblem[]

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
