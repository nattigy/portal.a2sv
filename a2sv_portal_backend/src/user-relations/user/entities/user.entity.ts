import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { RoleEnum, StatusEnum } from '@prisma/client'
import { Group } from 'src/group-relations/group/entities/group.entity'
import { UserProfile } from 'src/user-relations/user-profile/entities/user-profile.entity'
import { UserSeasonTopicProblem } from '../../user-season-topic-problem/entities/user-season-topic-problem.entity'
import { UserSeasonTopic } from '../../user-season-topic/entities/user-season-topic.entity'
import { UserSeasonContest } from '../../user-season-contest/entities/user-season-contest.entity'

@ObjectType()
export class User {
  @Field({ description: 'Id of the user' })
  id: string

  @Field()
  firstName: string

  @Field()
  middleName: string

  @Field()
  lastName: string

  @Field(() => RoleEnum, { defaultValue: RoleEnum.STUDENT, description: 'Role of the user' })
  role: RoleEnum

  @Field({ description: 'Email of the user' })
  email: string

  password: string

  @Field(() => StatusEnum)
  status: StatusEnum

  @Field(() => Group, { description: 'Group the user belongs to' })
  group: Group

  @Field({
    nullable: true,
    description: 'Group id of the group the user belongs to',
  })
  groupId?: string

  @Field(() => Group, {
    nullable: true,
    description: 'If the user is a head, the group he is a head to',
  })
  headToGroup?: Group

  @Field({ nullable: true, description: 'Id of the userprofile for the user ' })
  userProfilesId?: string

  @Field(() => UserProfile, { nullable: true, description: 'user profile of the user' })
  userProfile?: UserProfile

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

registerEnumType(StatusEnum, { name: 'StatusEnum'})

registerEnumType(RoleEnum, { name: 'RoleEnum'})
