import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../season/entities/season.entity'
import { JoinRequestEnum } from '@prisma/client'
import { User } from '../../user/entities/user.entity'
import { GroupSeasonTopic } from '../../group-season-topic/entities/group-season-topic.entity'
import { GroupSeasonContest } from '../../group-season-contest/entities/group-season-contest.entity'

@ObjectType()
export class GroupSeason {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  isActive: boolean

  @Field()
  headId: string

  @Field(() => JoinRequestEnum)
  joinRequest: JoinRequestEnum

  @Field(() => GraphQLISODateTime)
  startDate: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date

  @Field(() => Group)
  group: Group

  @Field(() => Season)
  season: Season

  @Field(() => User)
  head: User

  @Field(() => [GroupSeasonTopic])
  groupSeasonTopics: GroupSeasonTopic[]

  @Field(() => [GroupSeasonContest])
  groupSeasonContests: GroupSeasonContest[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

registerEnumType(JoinRequestEnum, { name: 'JoinRequestEnum' })
