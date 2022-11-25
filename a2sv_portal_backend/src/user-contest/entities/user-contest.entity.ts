import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Contest } from '../../contest/entities/contest.entity'
import { UserContestProblem } from '../../user-contest-problem/entities/user-contest-problem.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class UserContest {
  @Field()
  contestId: string
  @Field(() => [UserContestProblem], { nullable: true })
  userContestProblems?: UserContestProblem[]
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
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
