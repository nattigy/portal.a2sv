import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { GroupStatResponse } from '../../group/dto/group-stat-response'
import { Entity } from './entity.type'

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  take: number

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  count: number
}

// @ObjectType()
// export class PaginationUserContests {
//   @Field(() => [UserContest])
//   items: UserContest[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationUser {
//   @Field(() => [User])
//   items: User[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationSeason {
//   @Field(() => [Season])
//   items: Season[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationTopic {
//   @Field(() => [Topic])
//   items: Topic[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationContest {
//   @Field(() => [Contest])
//   items: Contest[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationProblem {
//   @Field(() => [Problem])
//   items: Problem[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
// @ObjectType()
// export class PaginationGroup {
//   @Field(() => [Group])
//   items: Group[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
//
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

@ObjectType()
export class PaginationOutput<T> {
  @Field(() => [Entity])
  items: T[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}
