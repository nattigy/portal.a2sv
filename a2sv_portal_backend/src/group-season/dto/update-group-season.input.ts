import { CreateGroupSeasonInput } from './create-group-season.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupSeasonInput extends PartialType(CreateGroupSeasonInput) {
  @Field(() => Int)
  id: number;
}
