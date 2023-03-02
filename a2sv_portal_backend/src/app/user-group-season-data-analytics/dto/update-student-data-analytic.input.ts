import { CreateStudentDataAnalyticInput } from './create-student-data-analytic.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateStudentDataAnalyticInput extends PartialType(
  CreateStudentDataAnalyticInput,
) {
  @Field(() => Int)
  id: number
}
