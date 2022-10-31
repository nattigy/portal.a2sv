import { CreateUserContestProblemInput } from './create-user-contest-problem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {UserContestProblemEnum} from "../entities/user-contest-problem.entity";

@InputType()
export class UpdateUserContestProblemInput extends PartialType(CreateUserContestProblemInput) {
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
