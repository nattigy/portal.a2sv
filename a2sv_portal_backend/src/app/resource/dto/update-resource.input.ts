import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateResourceInput } from './create-resource.input'

@InputType()
export class UpdateResourceInput extends PartialType(CreateResourceInput) {
  @Field(() => String)
  id: string
}
