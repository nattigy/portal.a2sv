import { Field, ObjectType } from '@nestjs/graphql'
import { Group } from '../../group/entities/group.entity'
import { SeasonContest } from '../../season-contest/entities/season-contest.entity'

@ObjectType()
export class GroupSeasonContest {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field(() => Group)
  group: Group

  @Field(() => SeasonContest)
  seasonContest: SeasonContest

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
