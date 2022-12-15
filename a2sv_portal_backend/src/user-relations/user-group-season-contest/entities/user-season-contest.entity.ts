import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserGroupSeasonContestProblem } from './../../user-group-season-contest-problem/entities/user-season-contest-problem.entity';

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
 
  @Field(() => Int)
  timeSpent: number

  @Field(() => Boolean)
  contestAttended: boolean

  // @Field(() => SeasonContest)
  // seasonContest: SeasonContest
  //
  // @Field(() => UserGroupSeason)
  // UserGroupSeason: UserGroupSeason

  // @Field(() => [UserGroupSeasonContestProblem])
  // UserGroupSeasonContestProblems: UserGroupSeasonContestProblem[]
  // @Field(() => [UserSeasonContestProblem])
  // userSeasonContestProblems: UserSeasonContestProblem[]
  @Field(()=>[UserGroupSeasonContestProblem])
  userGroupSeasonContestProblems:UserGroupSeasonContestProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
