import {Field, InputType, Int} from '@nestjs/graphql';
import {UserContestProblemEnum} from "../entities/user-contest-problem.entity";
import {Problem} from "../../problem/entities/problem.entity";
import {UserContest} from "../../user-contest/entities/user-contest.entity";

@InputType()
export class CreateUserContestProblemInput {
  @Field(() => String)
  userId: string
  @Field(() => String)
  contestId: string
  @Field(() => String)
  problemId: string
  @Field(() => UserContestProblemEnum)
  status: UserContestProblemEnum
  @Field(() => Int)
  numberOfAttempts: number
  @Field(() => Int)
  numberOfMinutes: number
}
