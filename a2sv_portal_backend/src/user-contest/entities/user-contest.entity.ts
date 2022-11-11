import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { UserContestProblem } from '../../user-contest-problem/entities/user-contest-problem.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserContest {
  @Field(() => String)
  contestId: string
  @Field(() => [UserContestProblem])
  userContestProblems?: UserContestProblem[]
  @Field(() => String)
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
  @Field(() => User)
  user: User
  @Field(() => Contest)
  contest: Contest
}
