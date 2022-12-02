import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateGroupSeasonInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
