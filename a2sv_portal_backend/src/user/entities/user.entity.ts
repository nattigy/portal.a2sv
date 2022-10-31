import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql'
import { Status } from '@prisma/client'
import { Group } from 'src/group/entities/group.entity'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { RoleEnum } from '@prisma/client'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import {SeasonTopicProblemUser} from "../../season-topic-problem-user/entities/season-topic-problem-user.entity";

@ObjectType()
export class User {
  @Field(() => String)
  id: string
  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT })
  role: RoleEnum
  @Field({})
  email: string
  @Field(() => Status)
  status: Status
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field(() => String, { nullable: true })
  groupId?: string
  @Field(() => [SeasonTopicProblemUser], { nullable: true })
  seasonTopicProblems?: SeasonTopicProblemUser[]
  @Field(() => Group, { nullable: true })
  headToGroup?: Group
  @Field(() => String, { nullable: true })
  userProfilesId?: string
  @Field(() => UserProfile, { nullable: true })
  userProfile?: UserProfile
  @Field(() => [UserTopic], { nullable: true })
  topics?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'Status',
})
