import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateMailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
