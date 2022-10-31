import { InputType, Int, Field } from '@nestjs/graphql';
import {UserContestProblem} from "../../user-contest-problem/entities/user-contest-problem.entity";
import {User} from "../../user/entities/user.entity";
import {Contest} from "../../contest/entities/contest.entity";

@InputType()
export class CreateUserContestInput {
  @Field()
  contestId: string
  @Field(() => String)
  userId: string
}
