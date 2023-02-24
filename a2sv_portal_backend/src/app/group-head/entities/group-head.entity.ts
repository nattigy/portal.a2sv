import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { Group } from '../../group/entities/group.entity'

@ObjectType()
export class GroupHead {
  @Field({ description: 'Id of the group' })
  groupId: string

  @Field({ description: 'Name of the group' })
  headId: string

  @Field(() => User, { nullable: true })
  users?: User

  @Field(() => Group, { nullable: true })
  group?: Group

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
