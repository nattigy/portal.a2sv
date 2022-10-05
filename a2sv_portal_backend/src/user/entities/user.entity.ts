import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { Group } from 'src/group/entities/group.entity'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { RoleEnum } from '@prisma/client'
import { GroupTopicSeasonProblemUser } from '../../group-topic-season-problem-user/entities/group-topic-season-problem-user.entity'
import {Topic} from "../../topic/entities/topic.entity";
import {UserTopic} from "../../user-topic/entities/user-topic.entity";

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
  @Field(() => [GroupTopicSeasonProblemUser], { nullable: true })
  groupTopicSeasonProblems?: GroupTopicSeasonProblemUser[]
  @Field(() => Group, { nullable: true })
  headToGroup?: Group
  @Field(() => Int, { nullable: true })
  userProfilesId?: number
  @Field(() => UserProfile, { nullable: true })
  userProfile?: UserProfile
  @Field(() => [UserTopic], {nullable: true})
  topics?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'Status',
})
