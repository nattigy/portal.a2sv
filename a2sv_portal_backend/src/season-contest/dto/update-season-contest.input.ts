import { CreateSeasonContestInput } from './create-season-contest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSeasonContestInput extends PartialType(CreateSeasonContestInput) {
  @Field(() => Int)
  id: number;
}
