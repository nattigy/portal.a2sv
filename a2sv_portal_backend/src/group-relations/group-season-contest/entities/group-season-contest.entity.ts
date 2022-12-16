import { Field, ObjectType } from '@nestjs/graphql'
import { GroupSeasonContestProblem } from 'src/group-relations/group-season-contest-problem/entities/group-season-contest-problem.entity'
import { Contest } from '../../../contest/entities/contest.entity'

@ObjectType()
export class GroupSeasonContest {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  // TODO: add all necessary fields from contest

  @Field(() => Contest)
  contest: Contest

  @Field(() => [GroupSeasonContestProblem])
  groupSeasonContestProblems: GroupSeasonContestProblem[]

  // @Field(() => [UserGroupSeasonContest])
  // userGroupSeasonContests: UserGroupSeasonContest[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
