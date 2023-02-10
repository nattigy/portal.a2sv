import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateUsersUpdateTopicComfortabilityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
