import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  limit: number

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  count: number

  @Field(() => Int)
  userCount: number
}

@ObjectType()
export class UsersPage<T> {
  @Field(() => [User])
  items: T[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}
