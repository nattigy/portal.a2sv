import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { UserContestProblem } from '../../user-season-contest-problem/entities/user-season-contest-problem.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserSeasonContest {
  @Field()
  contestId: string

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

  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => Contest, { nullable: true })
  contest?: Contest

  @Field(() => [UserContestProblem])
  userSeasonContestProblems: UserContestProblem[]

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}
