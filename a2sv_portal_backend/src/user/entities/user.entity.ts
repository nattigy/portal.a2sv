import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'
import { Group } from 'src/group/entities/group.entity'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { SeasonTopicUserProblem } from '../../season-topic-user-problem/entities/season-topic-user-problem.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'

@ObjectType()
export class User {
  @Field(() => String, {description:"Id of the user"})
  id: string
  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT , description:"Role of the user"})
  role: RoleEnum
  @Field({description:"Email of the user"})
  email: string
  @Field(() => Status)
  status: Status
  @Field(() => Group, { nullable: true, description:"Group the user belongs to" })
  group?: Group
  @Field(() => String, { nullable: true, description:"Group id of the group the user belongs to" })
  groupId?: string
  @Field(() => [SeasonTopicUserProblem], { nullable: true })
  seasonTopicProblems?: SeasonTopicUserProblem[]
  @Field(() => Group, { nullable: true, description:"If the user is a head, the group he is a head to" })
  headToGroup?: Group
  @Field(() => String, { nullable: true ,description:"Id of the userprofile for the user "})
  userProfilesId?: string
  @Field(() => UserProfile, { nullable: true, description:"user profile of the user" })
  userProfile?: UserProfile
  @Field(() => [UserTopic], { nullable: true ,description:"topics the user has to cover, covering , covered "})
  topics?: UserTopic[]
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'Status',
})
