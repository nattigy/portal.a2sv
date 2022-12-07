import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTopicInput {
  @Field()
  name: string

  @Field()
  description: string
}
