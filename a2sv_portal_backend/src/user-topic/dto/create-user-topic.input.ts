import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateUserTopicInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
