import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { ContestProblem } from '../../contest-problem/entities/contest-problem.entity'
import { UserGroupSeasonContestProblem } from '../../user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'

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

  @Field(() => ContestProblem)
  contestProblem: ContestProblem

  @Field(() => [UserGroupSeasonContestProblem])
  userGroupSeasonContestProblems: UserGroupSeasonContestProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
