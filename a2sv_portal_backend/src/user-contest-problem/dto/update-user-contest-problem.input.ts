import { CreateUserContestProblemInput } from './create-user-contest-problem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserContestProblemInput extends PartialType(CreateUserContestProblemInput) {
  @Field(() => Int)
  id: number;
}
