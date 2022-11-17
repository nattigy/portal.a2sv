import { CreateDataAnalyticInput } from './create-data-analytic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAnalyticInput extends PartialType(CreateDataAnalyticInput) {
  @Field(() => Int)
  id: number;
}
