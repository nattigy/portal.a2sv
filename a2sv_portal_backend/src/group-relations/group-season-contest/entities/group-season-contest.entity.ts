import { Field, ObjectType } from '@nestjs/graphql'
import { GroupSeasonContestProblem } from 'src/group-relations/group-season-contest-problem/entities/group-season-contest-problem.entity'
import { SeasonContest } from '../../../season-relations/season-contest/entities/season-contest.entity'

@ObjectType()
export class GroupSeasonContest {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field(() => SeasonContest)
  seasonContest?: SeasonContest

  // @Field(() => GroupSeason)
  // groupSeason?: GroupSeason
  @Field(() => GroupSeasonContestProblem)
  groupSeasonContestProblem: GroupSeasonContestProblem

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
