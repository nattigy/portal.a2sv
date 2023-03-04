import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { Season } from '../../season/entities/season.entity'
import { JoinRequestEnum } from '@prisma/client'
import { GroupSeasonTopic } from '../../group-season-topic/entities/group-season-topic.entity'
import { GroupSeasonContest } from '../../group-season-contest/entities/group-season-contest.entity'
import { GroupSeasonHead } from '../../group-season-head/entities/group-season-head.entity'

@ObjectType()
export class GroupSeason {
  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  isActive: boolean

  @Field(() => JoinRequestEnum)
  joinRequest: JoinRequestEnum

  @Field(() => GraphQLISODateTime)
  startDate: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date

  @Field(() => Int)
  numberOfStudents: number

  @Field(() => Int)
  totalSubmissions: number

  @Field(() => Int)
  totalAcceptedSubmissions: number

  @Field(() => Float)
  acceptanceRate: number

  @Field(() => Int)
  easyCount: number

  @Field(() => Int)
  mediumCount: number

  @Field(() => Int)
  hardCount: number

  @Field(() => Float)
  averageContestRating: number

  @Field(() => Int)
  totalContestsAttended: number

  @Field(() => Group)
  group: Group

  @Field(() => Season)
  season: Season

  @Field(() => [GroupSeasonHead])
  groupSeasonHeads: GroupSeasonHead[]

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
