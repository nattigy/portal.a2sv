import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserGroupSeasonContest {
  @Field()
  contestId: string

  @Field()
  seasonId: string

  @Field()
  userId: string

  @Field(() => Boolean)
  contestAttended: boolean

  @Field(() => Int)
  problemsSolved: number

  @Field(() => Int)
  wrongSubmissions: number

  @Field(() => Int)
  rank: number

  @Field(() => Int)
  timeSpent: number

  // @Field(() => SeasonContest)
  // seasonContest: SeasonContest
  //
  // @Field(() => UserGroupSeason)
  // UserGroupSeason: UserGroupSeason

  // @Field(() => [UserGroupSeasonContestProblem])
  // UserGroupSeasonContestProblems: UserGroupSeasonContestProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
