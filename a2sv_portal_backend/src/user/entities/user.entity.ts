import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, Status } from '@prisma/client'
import { Group } from 'src/group/entities/group.entity'
import { UserProfile } from 'src/user-profile/entities/user-profile.entity'
import { UserSeasonTopicProblem } from '../../user-season-topic-problem/entities/user-season-topic-problem.entity'
import { UserTopic } from '../../user-topic/entities/user-topic.entity'
import { UserSeasonContest } from '../../user-season-contest/entities/user-season-contest.entity'

@ObjectType()
export class User {
  @Field(() => String, { description: 'Id of the user' })
  id: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT, description: 'Role of the user' })
  role: RoleEnum

  @Field({ description: 'Email of the user' })
  email: string

  password: string

  @Field(() => Status)
  status: Status

  @Field(() => Group, { nullable: true, description: 'Group the user belongs to' })
  group?: Group

  @Field(() => String, {
    nullable: true,
    description: 'Group id of the group the user belongs to',
  })
  groupId?: string

  @Field(() => [UserSeasonTopicProblem],{nullable: true})
  seasonTopicProblems?: UserSeasonTopicProblem[]

  @Field(() => Group, {
    nullable: true,
    description: 'If the user is a head, the group he is a head to',
  })
  headToGroup?: Group

  @Field(() => String, { nullable: true, description: 'Id of the userprofile for the user ' })
  userProfilesId?: string

  @Field(() => UserProfile, { nullable: true, description: 'user profile of the user' })
  userProfile?: UserProfile

  @Field(() => [UserTopic], {
    nullable: true,
    description: 'topics the user has to cover, covering , covered ',
  })
  userTopics?: UserTopic[]

  @Field(() => [UserSeasonContest], {
    description: 'topics the user has to cover, covering , covered ',
  })
  userContests?: UserSeasonContest[]

  @Field(() => [UserSeasonTopicProblem], {
    description: 'topics the user has to cover, covering , covered ',
  })
  userSeasonTopicProblems?: UserSeasonTopicProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(Status, {
  name: 'status',
})

registerEnumType(RoleEnum, {
  name: 'role',
})
