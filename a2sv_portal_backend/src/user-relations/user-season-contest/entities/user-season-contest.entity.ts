import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserSeasonContestProblem } from '../../user-season-contest-problem/entities/user-season-contest-problem.entity'
import { UserSeason } from '../../user-season/entities/user-season.entity'
import { SeasonContest } from '../../../season-relations/season-contest/entities/season-contest.entity'

@ObjectType()
export class UserSeasonContest {
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

  @Field(() => SeasonContest)
  seasonContest: SeasonContest

  @Field(() => UserSeason)
  userSeason: UserSeason

  @Field(() => [UserSeasonContestProblem])
  userSeasonContestProblems: UserSeasonContestProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
