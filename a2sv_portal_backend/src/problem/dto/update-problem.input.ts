import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateProblemInput } from './create-problem.input'

@InputType()
export class UpdateProblemInput extends PartialType(CreateProblemInput) {
  @Field()
  id: string
}
