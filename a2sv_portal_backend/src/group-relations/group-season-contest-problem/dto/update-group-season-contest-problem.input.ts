import { CreateGroupSeasonContestProblemInput } from './create-group-season-contest-problem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupSeasonContestProblemInput extends PartialType(CreateGroupSeasonContestProblemInput) {
  @Field(() => Int)
  id: number;
}
