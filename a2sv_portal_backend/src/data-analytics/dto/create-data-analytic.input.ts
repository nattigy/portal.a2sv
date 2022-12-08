import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateDataAnalyticInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}