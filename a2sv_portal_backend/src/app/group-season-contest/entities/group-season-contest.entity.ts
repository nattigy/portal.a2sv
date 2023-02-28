import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { GroupSeasonContestProblem } from '../../group-season-contest-problem/entities/group-season-contest-problem.entity'
import { UserGroupSeasonContest } from '../../user-group-season-contest/entities/user-group-season-contest.entity'

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

  @Field(() => [UserGroupSeasonContest])
  userGroupSeasonContests: UserGroupSeasonContest[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
