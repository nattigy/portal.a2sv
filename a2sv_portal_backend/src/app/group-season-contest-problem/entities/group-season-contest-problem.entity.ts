import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Problem } from '../../problem/entities/problem.entity'

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

  // @Field(() => [UserGroupSeasonContestProblem])
  // userGroupSeasonContestProblems: UserGroupSeasonContestProblem

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
