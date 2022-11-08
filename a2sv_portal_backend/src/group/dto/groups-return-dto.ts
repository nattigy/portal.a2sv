import { Field, ObjectType } from '@nestjs/graphql'
import { PaginationInfo } from '../../common/page/pagination-info'
import { Group } from '../entities/group.entity'

@ObjectType()
export class GroupsPaginated {
  @Field(() => [GroupsUsersPaginated])
  items: GroupsUsersPaginated[]

  @Field(() => PaginationInfo)
  pageInfo: PaginationInfo
}

@ObjectType()
export class GroupsUsersPaginated {
  @Field(() => Group)
  group: Group

  @Field(() => PaginationInfo, { nullable: true })
  pageInfo?: PaginationInfo
}

// @ObjectType()
// export class UsersPaginated {
//   @Field(() => [User])
//   items: User[]
//
//   @Field(() => PaginationInfo)
//   pageInfo: PaginationInfo
// }
