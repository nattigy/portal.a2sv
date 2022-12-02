import { Field, ObjectType } from '@nestjs/graphql'
import { SeasonTopic } from '../../season-topic/entities/season-topic.entity'
import { SeasonType } from '@prisma/client'
import { SeasonContest } from '../../season-contest/entities/season-contest.entity'

@ObjectType()
export class Season {
  @Field(() => String, { description: `Season Id` })
  id: string

  @Field({ description: `Season Name` })
  name: string

  @Field({ description: `Type of the season is it Camp or Education or Project` })
  seasonType: SeasonType

  @Field({ description: `Implies if the season active currently or ended/inactive` })
  isActive?: boolean

  @Field(() => Date, { description: `The start date of the season` })
  startDate: Date

  @Field(() => Date, { description: `The end date of the season` })
  endDate: Date

  @Field(() => [SeasonTopic], { description: `Topic that belong to the season` })
  seasonTopics?: SeasonTopic[]

  @Field(() => [SeasonContest], { description: `Topic that belong to the season` })
  seasonContests: SeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
