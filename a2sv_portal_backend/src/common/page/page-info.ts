import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../season/entities/season.entity'
import { Contest } from '../../contest/entities/contest.entity'
import { Problem } from '../../problem/entities/problem.entity'
import { GroupStatResponse } from '../../group/dto/group-stat-response'
import { Topic } from '../../topic/entities/topic.entity'

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  limit: number

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  count: number
}

@ObjectType()
export class UsersPage<T> {
  @Field(() => [User])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class GroupsPage<T> {
  @Field(() => [Group])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class SeasonsPage<T> {
  @Field(() => [Season])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class ContestsPage<T> {
  @Field(() => [Contest])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class ProblemsPage<T> {
  @Field(() => [Problem])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class TopicsPage<T> {
  @Field(() => [Topic])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class GroupStatResponsePage<T> {
  @Field(() => [GroupStatResponse])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}
