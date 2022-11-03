import { Field, ObjectType } from '@nestjs/graphql'
import { PageInfo } from '../../common/page/page-info'
import { Group } from '../entities/group.entity'

@ObjectType()
export class GroupsPaginated {
  @Field(() => [GroupsUsersPaginated])
  items: GroupsUsersPaginated[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
export class GroupsUsersPaginated {
  @Field(() => Group)
  group: Group

  @Field(() => PageInfo, { nullable: true })
  pageInfo?: PageInfo
}

// @ObjectType()
// export class UsersPaginated {
//   @Field(() => [User])
//   items: User[]
//
//   @Field(() => PageInfo)
//   pageInfo: PageInfo
// }
