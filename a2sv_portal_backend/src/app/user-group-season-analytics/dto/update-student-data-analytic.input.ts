import { CreateStudentDataAnalyticInput } from './create-student-data-analytic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentDataAnalyticInput extends PartialType(CreateStudentDataAnalyticInput) {
  @Field(() => Int)
  id: number;
}
