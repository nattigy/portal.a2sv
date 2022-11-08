import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../season/entities/season.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { GroupStatResponse } from '../../group/dto/group-stat-response'
import { Topic } from '../../topic/entities/topic.entity'
import { GroupContest } from '../../group-contest/entities/group-contest.entity'
import { UserContest } from '../../user-contest/entities/user-contest.entity'
import { UserContestProblem } from '../../user-contest-problem/entities/user-contest-problem.entity'

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  take: number

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  count: number
}

const GENERIC_TYPE: any =
  User ||
  Group ||
  Season ||
  Contest ||
  Problem ||
  Topic ||
  GroupContest ||
  UserContest ||
  UserContestProblem

@ObjectType()
export class PaginationOutput<T> {
  @Field(() => [GENERIC_TYPE])
  items: T[]

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
