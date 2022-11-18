import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'
import { SeasonType } from '@prisma/client'

@ObjectType()
export class Season {
  @Field(() => String, { description: `Season Id` })
  id: string
  @Field({ description: `Season Name` })
  name: string
  @Field(() => String, { description: `Id of a Group the seaspn belongs to` })
  groupId: string
  @Field(() => Group, {
    nullable: true,
    description: `Group object where the season belongs to`,
  })
  group?: Group
  @Field({ description: `Type of the season is it Camp or Education or Project` })
  seasonType: SeasonType
  @Field({ description: `Implies if the season active currently or ended/inactive` })
  isActive?: boolean
  @Field(() => [SeasonTopic], {
    nullable: true,
    description: `Topic that belong to the season`,
  })
  topics?: SeasonTopic[]
  @Field(() => GraphQLISODateTime, { description: `The start date of the season` })
  startDate: Date
  @Field(() => GraphQLISODateTime, { description: `The end date of the season` })
  endDate: Date
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
