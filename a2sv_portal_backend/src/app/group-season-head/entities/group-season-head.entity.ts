import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class GroupSeasonHead {
  @Field({ description: 'Id of the group' })
  groupId: string

  @Field({ description: 'Id of the group' })
  seasonId: string

  @Field({ description: 'Name of the group' })
  headId: string

  @Field(() => User, { nullable: true })
  users?: User

  // @Field(() => GroupSeason, { nullable: true })
  // group?: GroupSeason

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
