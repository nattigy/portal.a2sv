import { Field, ObjectType } from '@nestjs/graphql'

import { Problem } from 'src/problem/entities/problem.entity'
import { UserGroupSeasonContestProblem } from 'src/user-relations/user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'

@ObjectType()
export class GroupSeasonContestProblem {
  @Field({ description: 'Example field (placeholder)' })
  groupId: string

  @Field({ description: 'Example field (placeholder)' })
  seasonId: string

  @Field({ description: 'Example field (placeholder)' })
  contestId: string

  @Field({ description: 'Example field (placeholder)' })
  problemId: string

  @Field(() => Problem)
  problem: Problem

  @Field(() => [UserGroupSeasonContestProblem])
  userGroupSeasonContestProblems?: UserGroupSeasonContestProblem

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
