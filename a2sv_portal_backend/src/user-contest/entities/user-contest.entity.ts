import { ObjectType, Field, Int } from '@nestjs/graphql';
import {GroupContest} from "../../group-contest/entities/group-contest.entity";
import {User} from "../../user/entities/user.entity";
import {UserContestProblem} from "../../user-contest-problem/entities/user-contest-problem.entity";
import {Contest} from "../../contest/entities/contest.entity";

@ObjectType()
export class UserContest {
  @Field(() => String)
  contestId: string
  @Field(() => [UserContestProblem])
  userContestProblem: UserContestProblem[]
  @Field(() => String)
  userId: string
  @Field(() => Int)
  problemsSolved:number
  @Field(() => Int)
  wrongSubmissions:number
  @Field(() => User)
  user: User
  @Field(() => Contest)
  contest: Contest
}
