import { CreateMailInput } from './create-mail.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateMailInput extends PartialType(CreateMailInput) {
  @Field(() => Int)
  id: number
}
