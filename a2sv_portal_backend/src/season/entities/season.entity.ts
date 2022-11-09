import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { SeasonType } from '@prisma/client'
import { Group } from '../../group/entities/group.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'

@ObjectType()
export class Season {
  @Field(() => String)
  id: string
  @Field()
  name: string
  @Field(() => String)
  groupId: string
  @Field(() => Group, { nullable: true })
  group?: Group
  @Field()
  seasonType: SeasonType
  @Field()
  isActive?: boolean
  @Field(() => [SeasonTopic], { nullable: true })
  topics?: SeasonTopic[]
  @Field(() => GraphQLISODateTime)
  startDate: Date
  @Field(() => GraphQLISODateTime)
  endDate: Date
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
