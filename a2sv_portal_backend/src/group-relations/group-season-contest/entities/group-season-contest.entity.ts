import { Field, ObjectType } from '@nestjs/graphql'
import { SeasonContest } from '../../../season-relations/season-contest/entities/season-contest.entity'
import { GroupSeason } from '../../group-season/entities/group-season.entity'

@ObjectType()
export class GroupSeasonContest {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field(() => SeasonContest)
  seasonContest: SeasonContest

  @Field(() => GroupSeason)
  groupSeason: GroupSeason

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
