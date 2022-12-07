import { Field, ObjectType } from '@nestjs/graphql'
import { Season } from '../../season/entities/season.entity'
import { Contest } from '../../../contest/entities/contest.entity'

@ObjectType()
export class SeasonContest {
  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field(() => Season, { description: 'Example field (placeholder)' })
  season: Season

  @Field(() => Contest, { description: 'Example field (placeholder)' })
  contest: Contest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
