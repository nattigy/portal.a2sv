import { CreateProblemInput } from './create-problem.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateProblemInput extends PartialType(CreateProblemInput) {
  @Field(() => String)
  id: string
}
