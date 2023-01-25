import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { UserGroupSeasonContestProblem } from '../../user-group-season-contest-problem/entities/user-group-season-contest-problem.entity'
import { Contest } from '../../contest/entities/contest.entity'

@ObjectType()
export class UserGroupSeasonContest {
  @Field()
  userId: string

  @Field()
  groupId: string

  @Field()
  seasonId: string

  @Field()
  contestId: string

  @Field(() => Int)
  problemsSolved: number

  @Field(() => Int)
  wrongSubmissions: number

  @Field(() => Int)
  rank: number

  @Field(() => Float)
  timeSpent: number

  @Field(() => Boolean)
  contestAttended: boolean

  @Field(() => Contest)
  contest: Contest

  @Field(() => [UserGroupSeasonContestProblem])
  userGroupSeasonContestProblems: UserGroupSeasonContestProblem[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}
