import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'
import { Group } from '../../group/entities/group.entity'
import { UserProfile } from '../../user-profile/entities/user-profile.entity'

@ObjectType()
export class User {
  @Field({ description: 'Id of the user' })
  id: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT, description: 'Role of the user' })
  role: RoleEnum

  @Field({ description: 'Email of the user' })
  email: string

  password: string

  @Field(() => StatusEnum)
  status: StatusEnum

  @Field(() => Group, { nullable: true, description: 'Group the user belongs to' })
  group?: Group

  @Field({
    nullable: true,
    description: 'Group id of the group the user belongs to',
  })
  groupId?: string

  @Field(() => [Group], {
    nullable: true,
    description: 'If the user is a head, the group he is a head to',
  })
  headToGroups?: Group[]

  // @Field({ nullable: true, description: 'Id of the userprofile for the user ' })
  // userProfilesId?: string

  @Field(() => UserProfile, { nullable: true, description: 'user profile of the user' })
  userProfile?: UserProfile

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date

  // @Field(() => Boolean, { nullable: true })
  // verified: boolean
}

registerEnumType(StatusEnum, { name: 'StatusEnum' })

registerEnumType(RoleEnum, { name: 'RoleEnum' })
