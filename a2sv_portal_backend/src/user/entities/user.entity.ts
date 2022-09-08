import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { Group } from 'src/groups/entities/group.entity'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { RoleEnum } from '@prisma/client'
import { GroupTopicProblemUser } from 'src/group-topic-problem-user/entities/group-topic-problem-user.entity'

@ObjectType()
export class User {
  @Field(() => ID)
  id: number
  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT })
  role: RoleEnum
  @Field({})
  email: string
  @Field(() => Status)
  status: Status
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field(() => Int, { nullable: true })
  groupId?: number
  @Field(() => [GroupTopicProblemUser], { nullable: true })
  groupTopicProblems?: GroupTopicProblemUser[]
  @Field(() => Group, { nullable: true })
  headToGroup?: Group
  @Field(() => Int, { nullable: true })
  userProfilesId?: number
  @Field(() => UserProfile, { nullable: true })
  userProfile?: UserProfile
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'Status',
})
